import { ChapterTreeData } from './type'
import React, { useCallback, useState } from 'react'
import { useEditChapter } from '../../server/fetchChapter'
import { reNameTreeNode } from '../../helper/chapterStudyTree'
import { IChapterReducerAction, IChapterReducerState } from '../../reducer/ChaperStudyTree/type/type'

interface IHandleChapterControl {
  data: ChapterTreeData[]
  chapterState: IChapterReducerState
  dispatchChapter: React.Dispatch<IChapterReducerAction>
}

export const useHandleRenameChapter = (props: IHandleChapterControl) => {
  const { data, dispatchChapter, chapterState } = props
  const { curAddInputValue } = chapterState
  /*当前重命名节点*/
  const [curRenameNode, setCurRenameNode] = useState<ChapterTreeData | null>(null)
  /*编辑章节*/
  const { mutateAsync: editChapterMutate } = useEditChapter()
  /*重命名节点*/
  const handleReNameTreeNode = useCallback(
    (chapterId: string) => {
      reNameTreeNode(data, chapterId, setCurRenameNode, dispatchChapter)
      dispatchChapter({ type: 'setFocusState', focusState: true })
    },
    [data]
  )
  /*确认重命名*/
  const confirmRename = useCallback(async () => {
    try {
      await editChapterMutate({
        chapter_id: curRenameNode?.id ?? '',
        new_name: curAddInputValue
      })
      setCurRenameNode((pre: any) => {
        pre.name = curAddInputValue
        return pre
      })
    } catch (err) {
      dispatchChapter({ type: 'setError', error: err })
    } finally {
      setCurRenameNode(null)
      dispatchChapter({ type: 'setCurInputValue', curInputValue: '' })
    }
  }, [curRenameNode, curAddInputValue])
  /* 取消重命名 */
  const cancelRename = useCallback(() => {
    setCurRenameNode(null)
    dispatchChapter({ type: 'setFocusState', focusState: false })
  }, [])
  return { handleReNameTreeNode, curRenameNode, cancelRename, confirmRename }
}
