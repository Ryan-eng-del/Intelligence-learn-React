import { QueryClient } from '@tanstack/react-query'
import { cloneDeepWith } from 'lodash'
import { KnowledgeNodeType, RelateNodeType } from 'server/fetchKnowledge/types'
import { AnyFn } from 'types'

export const updateKnowledgeTreeQueryCache = (
  updaterFun: AnyFn<KnowledgeNodeType[]>,
  queryClient: QueryClient
) => {
  const queryTreeData: KnowledgeNodeType[] | undefined = queryClient.getQueryData(['knowledgeTree'])
  const newQueryTreeData = updaterFun(queryTreeData)
  queryClient.setQueryData(['knowledgeTree'], newQueryTreeData)
}
/*添加子知识点*/
export const addChildKnowledgeNode = (
  data: any,
  id: any,
  queryClient: any,
  node: any
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        d.children = d.children.concat(node)
        queryClient.setQueryData(['knowledgeTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*删除知识点*/
export const deleteKnowledgeNode = (data: any, id: any, queryClient: any) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any, index: number) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        data.splice(index, 1)
        queryClient.setQueryData(['knowledgeTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*重命名节点*/
export const renameKnowledgePoint = (
  data: any,
  id: any,
  setCurRenameNode: any,
  setFocusState: any,
  setExpandKeys: any,
  setAddInputValue: any
) => {
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        setCurRenameNode(d)
        setAddInputValue(d.pointName)
        setFocusState(true)
      }
    })
  }
  recursion(data)
}
export const generateKnowledgeKeys = (data: KnowledgeNodeType[]) => {
  if (!data) return
  const result: any = []
  const recursion = (data: KnowledgeNodeType[]) => {
    data.forEach((d) => {
      if (d.children) {
        recursion(d.children)
      }
      result.push(d.pointId)
    })
  }
  recursion(data)
  return result
}
/*关联前序知识点*/
export const relateAllPoints = (
  data: any,
  id: any,
  queryClient: any,
  node: any,
  mark: any
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        mark === 'pre' ? (d.prePoints = node) : (d.afterPoints = node)
        queryClient.setQueryData(['knowledgeTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
export const generateRelatePointsObj = (data: any, checked: any) => {
  if (!data) return
  const result: RelateNodeType[] = []
  const recursion = (data: any) => {
    data.forEach((d: any) => {
      if (d.children) {
        recursion(d.children)
      }
      checked.forEach((id: any) => {
        if (d.pointId === id) {
          result.push({ pointId: id, pointName: d.pointName })
        }
      })
    })
  }
  recursion(data)
  return result
}
/*找到当前节点关联的id*/
export const findCurRelatePoints = (data: any, id: any, mark: any) => {
  const result: any = []
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.children.length) {
        recursion(d.children)
      }
      if (id == d.pointId) {
        if (mark === '前序') {
          d.prePoints.forEach((p: any) => {
            result.push(p.pointId)
          })
        } else {
          d.afterPoints.forEach((p: any) => {
            result.push(p.pointId)
          })
        }
      }
    })
  }
  recursion(data)
  return result
}
