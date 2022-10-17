/*受控展开树节点*/
import React, { Key } from 'react'
import { IChapterReducerAction } from '../../reducer/ChaperStudyTree/type/type'

export const useHandleRelateExpand = ({ dispatch }: { dispatch: React.Dispatch<IChapterReducerAction> }) => {
  /*点击知识点树节点进行展开*/
  const handleExpand = (id: Key[], info: any) => {
    let key = ''
    if (!info.node.expanded) {
      key = info.node.key
      dispatch({ type: 'setExpandKeys', expandKeys: (pre) => pre.concat(key) })
    } else {
      key = info.node.key
      dispatch({ type: 'setExpandKeys', expandKeys: (pre) => pre.filter((v) => v != key) })
    }
  }

  return { handleExpand }
}
