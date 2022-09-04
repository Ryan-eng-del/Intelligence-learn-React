import { cloneDeepWith } from 'lodash'
/*寻找要刪除的树的章节目录节点*/
export const deleteTreeNode = (data: any, id: any, queryClient: any) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any, index: number) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id == d.chapterId) {
        data.splice(index, 1)
        queryClient.setQueryData(['chapterTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*删除资源*/
export const deleteResource = (data: any, id: any, queryClient: any) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    data.map((d: any) => {
      if (!data) return
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime: any) => {
          if (courTime.resource && courTime.resource.length) {
            courTime.resource.forEach((resource: any, i: any) => {
              if (resource.id === id) {
                courTime.resource.splice(i, 1)
                queryClient.setQueryData(['chapterTree'], deepCloneData)
              }
            })
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}
/*删除课时*/
export const deleteTreeContent = (data: any, id: any, queryClient: any) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((da: any, index: any) => {
          if (da.id === id) {
            d.courTimes.splice(index, 1)
            queryClient.setQueryData(['chapterTree'], deepCloneData)
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}
export const addChildChapterNode = (
  data: any,
  id: any,
  queryClient: any,
  node: any
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id == d.chapterId) {
        d.childChapters = d.childChapters.concat(node)
        queryClient.setQueryData(['chapterTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*传入参数一更新函数来更新queryData,从而使得UI更新*/
export const updateChapterTreeQueryCache = (
  updaterFun: any,
  queryClient: any
) => {
  const queryTreeData: any = queryClient.getQueryData(['chapterTree'])
  const newQueryTreeData = updaterFun(queryTreeData)
  queryClient.setQueryData(['chapterTree'], newQueryTreeData)
}
/*添加课时*/
export const addChildContentNode = (
  data: any,
  id: any,
  queryClient: any,
  node: any
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id == d.chapterId) {
        d.courTimes = d.courTimes || []
        d.courTimes = d.courTimes.concat(node)
        queryClient.setQueryData(['chapterTree'], deepCloneData)
      }
    })
  }
  recursion(deepCloneData)
}
/*添加资源*/
export const addResource = (
  data: any,
  id: any,
  queryClient: any,
  node: any
) => {
  console.log(id)
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime: any) => {
          if (courTime.id === id) {
            courTime.resource = courTime.resource || []
            courTime.resource = courTime.resource.concat(node)
            console.log(courTime.resource)
            queryClient.setQueryData(['chapterTree'], deepCloneData)
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}
/*重命名节点*/
export const reNameTreeNode = (
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
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime: any) => {
          if (courTime.id === id) {
            setCurRenameNode(courTime)
            setAddInputValue(courTime.name)
            setFocusState(true)
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      if (id == d.chapterId) {
        setCurRenameNode(d)
        setAddInputValue(d.name)
        setFocusState(true)
        setExpandKeys((pre: any) => pre.concat(d.chapterId))
      }
    })
  }
  recursion(data)
}
/*受控keys，全部展开*/
export const generateExpandKeys = (data: any) => {
  if (!data) return
  const result: any = []
  const recursion = (data: any) => {
    data.forEach((d: any) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
        result.push(d.chapterId)
      } else {
        result.push(d.chapterId)
      }
    })
  }
  recursion(data)
  return result
}
/**/
export const formatResource = (resource: any) => {
  const result: any = []
  resource.forEach((r: any) => {
    if (r.type === '视频') {
      result.push(r)
    }
  })
  resource.forEach((r: any) => {
    if (r.type === '课件') {
      result.push(r)
    }
  })
  resource.forEach((r: any) => {
    if (r.type === '作业') {
      result.push(r)
    }
  })
  return result
}
/*挂载前展开所有视频*/
export const expandOnMount = (data: any) => {
  const result: any = []
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      result.push(d.chapterId)
    })
  }
  recursion(data)
  return result
}
