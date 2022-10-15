import React, { Key, useCallback } from 'react'
import { IChapterReducerAction } from '../../reducer/ChaperStudyTree/type/type'

export const useHandleOnExpand = (dispatch: React.Dispatch<IChapterReducerAction>) => {
  const handleOnExpand = useCallback((id: Key[], info: any) => {
    const key = info.node.key
    if (!info.node.expanded) {
      dispatch({ type: 'setExpandKeys', expandKeys: (pre) => pre.concat(key) })
    } else {
      dispatch({ type: 'setExpandKeys', expandKeys: (pre) => pre.filter((v) => v != key) })
    }
  }, [])
  return { handleOnExpand }
}
