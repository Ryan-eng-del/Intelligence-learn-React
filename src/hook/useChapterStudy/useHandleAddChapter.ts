import { ChapterInitNode, ChapterTreeData } from './type'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ChapterNode } from './config'
import { useAddChapter, useAddChildChapter } from '../../server/fetchChapter'
import { addChildChapterNode, deleteTreeNode, updateChapterTreeQueryCache } from '../../util/chapterStudyTree'
import { AddChapterParam } from '../../types/server/fetchChapter'
import { useQueryClient } from '@tanstack/react-query'
import { IChapterReducerAction, IChapterReducerState } from '../../reducer/ChaperStudyTree/type/type'

interface handleAddChapterProps {
  data: ChapterTreeData[]
  chapterState: IChapterReducerState
  dispatchChapter: React.Dispatch<IChapterReducerAction>
}

/*添加章节的Hook*/
export const useHandleAddChapter = (props: handleAddChapterProps) => {
  const { data, chapterState, dispatchChapter } = props
  const { curAddInputValue } = chapterState
  /*正在添加的类型*/
  const curAddType = useRef('')
  /*:表示正在向该id下的节点添加*/
  const curAddId = useRef('-1')
  const chapterNode = useMemo(() => Object.assign({}, ChapterNode), [data])
  /*当前交互的节点*/
  const [curAddNode, setCurAddNode] = useState<ChapterInitNode | null>(null)

  /*queryCline*/
  const queryClient = useQueryClient()
  /*添加根章节网络请求*/
  const { mutateAsync: addChapterMutate } = useAddChapter(setCurAddNode)
  /*添加子章节网络请求*/
  const { mutateAsync: addChildChapterMutate } = useAddChildChapter(setCurAddNode)

  /*点击添加根章节*/
  const handleClickAddChapter = useCallback(() => {
    curAddType.current = 'root'
    curAddId.current = '-1'
    setCurAddNode(() => chapterNode)
    /*将curNode加入根章节，修改UI*/
    updateChapterTreeQueryCache((queryTreeData: any) => queryTreeData.concat(chapterNode), queryClient)
    dispatchChapter({ type: 'setFocusState', focusState: true })
  }, [data])

  /*点击添加子章节*/
  const handleClickAddChildChapter = useCallback(
    (chapterId: string) => {
      curAddId.current = chapterId
      curAddType.current = 'noRoot'
      dispatchChapter({ type: 'setFocusState', focusState: true })
      setCurAddNode(chapterNode)
      addChildChapterNode(data, chapterId, queryClient, chapterNode)
    },
    [data]
  )

  /*确认添加章节*/
  const confirmAddChapter = useCallback(async () => {
    const param: AddChapterParam = {
      name: curAddInputValue,
      course_id: '####',
      pid: curAddId.current
    }
    try {
      setCurAddNode((pre: ChapterInitNode | null) => {
        if (!pre) return pre
        pre.name = curAddInputValue
        return pre
      })
      if (curAddType.current === 'root') {
        await addChapterMutate(param)
      } else await addChildChapterMutate(param)
    } catch (err: unknown) {
      dispatchChapter({ type: 'setError', error: err })
      deleteTreeNode(data, curAddId.current, queryClient)
    } finally {
      dispatchChapter({ type: 'setFocusState', focusState: false })
      setCurAddNode(null)
    }
  }, [curAddInputValue, dispatchChapter])

  /*取消添加章节*/
  const cancelAddChapter = useCallback(() => {
    deleteTreeNode(data, '-1', queryClient)
  }, [data])

  return {
    curAddNode,
    handleClickAddChapter,
    confirmAddChapter,
    cancelAddChapter,
    handleClickAddChildChapter
  }
}
