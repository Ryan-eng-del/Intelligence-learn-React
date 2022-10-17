import { useRenameKnowledgeAPI } from '../../server/fetchKnowledge'
import { useCallback, useRef, useState } from 'react'
import { IKnowledgePoint } from './type'
import { renameKnowledgePoint } from '../../util/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'

export const useRenameKnowledgePoints = (props: IHandleChapterControl<IKnowledgePoint>) => {
  const { dispatchChapter: dispatch, chapterState: knowledgeState, data } = props
  const { mutateAsync: renameKnowledgeAPI } = useRenameKnowledgeAPI()
  const curId = useRef('')
  const [curRenameNode, setCurRenameNode] = useState<IKnowledgePoint | null>()
  /*重命名节点*/
  const renameKnowledgeNode = (id: string) => {
    dispatch({ type: 'setFocusState', focusState: true })
    renameKnowledgePoint(data, id, setCurRenameNode, dispatch)
  }
  /*确认重命名*/
  const confirmRename = async () => {
    try {
      await renameKnowledgeAPI({ pointId: curId.current, pointName: knowledgeState.curAddInputValue })
      setCurRenameNode((pre) => {
        if (pre) {
          pre.pointName = knowledgeState.curAddInputValue
        }
        return pre
      })
    } catch (e) {
      dispatch({ type: 'setError', error: e })
    } finally {
      dispatch({ type: 'setFocusState', focusState: false })
      dispatch({ type: 'setCurInputValue', curInputValue: '' })
    }
  }
  /*取消重命名*/
  const cancelRename = useCallback(() => {
    dispatch({ type: 'setFocusState', focusState: false })
  }, [dispatch])

  return { cancelRename, curRenameNode, renameKnowledgeNode, confirmRename }
}
