import { useCallback, useMemo, useRef, useState } from 'react'
import { IKnowledgePoint } from './type'
import { useAddKnowledgePointsAPI } from '../../server/fetchKnowledge'
import { initialKnowledgePoint } from './config'
import { addChildKnowledgeNode, deleteKnowledgeNode, updateKnowledgeTreeQueryCache } from '../../helper/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { useQueryClient } from '@tanstack/react-query'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

export const useAddKnowledgePoints = (props: IHandleChapterControl<IKnowledgePoint>) => {
  const { data, chapterState: knowledgeState, dispatchChapter: dispatch } = props
  const [curKnowledgeNode, setCurKnowledgeNode] = useState<IKnowledgePoint | null>(null)
  const { classInfo } = useCurrentClassInfo()

  const { mutateAsync: addKnowledgePoints } = useAddKnowledgePointsAPI()
  const knowledgeNode: IKnowledgePoint = useMemo(() => Object.assign({}, initialKnowledgePoint), [data])
  const queryClient = useQueryClient()
  const curId = useRef('')
  /*添加知识点*/
  const addKnowledgePoint = useCallback(() => {
    setCurKnowledgeNode(() => knowledgeNode)
    updateKnowledgeTreeQueryCache(
      (queryTreeData: IKnowledgePoint[]) => queryTreeData.concat(knowledgeNode || []),
      queryClient
    )
    dispatch({ type: 'setFocusState', focusState: true })
  }, [data])
  /*添加子知识点*/
  const addKnowledgeChildrenPoint = useCallback(
    (id: string) => {
      curId.current = id
      /*这里node保持引用，之后可以修改根据引用来创建name*/
      dispatch({ type: 'setFocusState', focusState: true })
      addChildKnowledgeNode(data, id, queryClient, knowledgeNode)
      setCurKnowledgeNode(knowledgeNode)
    },
    [data]
  )

  /*确认添加知识点*/
  const confirmAdd = useCallback(async () => {
    try {
      const knowledgeId = await addKnowledgePoints({
        pointName: knowledgeState.curAddInputValue,
        pointPid: curId.current ? '555' : curId.current,
        courseId: classInfo.courseId
      })
      setCurKnowledgeNode((pre) => {
        if (pre) {
          pre.pointPid = knowledgeId
          pre.pointName = knowledgeState.curAddInputValue
        }
        return pre
      })
    } catch (err: unknown) {
      dispatch({ type: 'setError', error: err })
      deleteKnowledgeNode(data, curKnowledgeNode?.pointId, queryClient)
    } finally {
      dispatch({ type: 'setFocusState', focusState: false })
      dispatch({ type: 'setCurInputValue', curInputValue: '' })
      curId.current = ''
      setCurKnowledgeNode(null)
    }
  }, [data, knowledgeState])
  /*取消添加节点*/
  const cancelAdd = () => {
    deleteKnowledgeNode(data, '-1', queryClient)
    dispatch({ type: 'setFocusState', focusState: false })
  }
  return { confirmAdd, addKnowledgePoint, curKnowledgeNode, setCurKnowledgeNode, cancelAdd, addKnowledgeChildrenPoint }
}
