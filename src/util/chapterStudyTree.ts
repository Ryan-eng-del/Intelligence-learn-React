import { QueryClient } from '@tanstack/react-query'
import { cloneDeepWith } from 'lodash'
import { ChapterNodeType, ChapterResourceType, CourTimeType } from 'server/fetchChapter/types'
import { StateSetter } from 'types'
/*寻找要刪除的树的章节目录节点*/
export const deleteTreeNode = (data: ChapterNodeType[], id: string | void, queryClient: QueryClient) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d, index) => {
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
export const deleteResource = (data: ChapterNodeType[], id: string, queryClient: QueryClient) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    data.map((d) => {
      if (!data) return
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime) => {
          if (courTime.resource && courTime.resource.length) {
            courTime.resource.forEach((resource, i) => {
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
export const deleteTreeContent = (data: ChapterNodeType[], id: string, queryClient: QueryClient) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d) => {
        d.courTimes?.forEach((da, index) => {
          if (da.id === id) {
            d.courTimes?.splice(index, 1)
            queryClient.setQueryData(['chapterTree'], deepCloneData)
          }
        })
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  recursion(deepCloneData)
}
export const addChildChapterNode = (
  data: ChapterNodeType[],
  id: string,
  queryClient: QueryClient,
  node: ChapterNodeType
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d) => {
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
  updaterFun: (Treedata:ChapterNodeType[])=>ChapterNodeType[],
  queryClient: QueryClient
) => {
  const queryTreeData: ChapterNodeType[] | undefined = queryClient.getQueryData(['chapterTree'])
  const newQueryTreeData = queryTreeData ? updaterFun(queryTreeData!) : 0;
  queryClient.setQueryData(['chapterTree'], newQueryTreeData)
}
/*添加课时*/
export const addChildContentNode = (
  data: ChapterNodeType[],
  id: string,
  queryClient: QueryClient,
  node: CourTimeType | CourTimeType[]
) => {
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d) => {
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
  data: ChapterNodeType[],
  id: string,
  queryClient: QueryClient,
  node: ChapterResourceType | ChapterResourceType[]
) => {
  console.log(id)
  const deepCloneData = cloneDeepWith(data)
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d) => {
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime) => {
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
  data: ChapterNodeType[],
  id: string,
  setCurRenameNode: StateSetter<ChapterNodeType | CourTimeType> ,
  setFocusState: StateSetter<boolean>,
  setExpandKeys: StateSetter<string[]>,
  setAddInputValue: StateSetter<string>
) => {
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d) => {
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime) => {
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
        setExpandKeys((pre) => pre.concat(d.chapterId))
      }
    })
  }
  recursion(data)
}
/*受控keys，全部展开*/
export const generateExpandKeys = (data: ChapterNodeType[]) => {
  if (!data) return []
  const result: string[] = []
  const recursion = (data: ChapterNodeType[]) => {
    data.forEach((d) => {
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
export const formatResource = (resource: ChapterResourceType[]) => {
  const result: ChapterResourceType[] = []
  resource.forEach((r) => {
    if (r.type === '视频') {
      result.push(r)
    }
  })
  resource.forEach((r) => {
    if (r.type === '课件') {
      result.push(r)
    }
  })
  resource.forEach((r) => {
    if (r.type === '作业') {
      result.push(r)
    }
  })
  return result
}
/*挂载前展开所有视频*/
export const expandOnMount = (data: ChapterNodeType[]) => {
  const result: string[] = []
  const recursion = (data: ChapterNodeType[]) => {
    if (!data) return
    data.map((d: ChapterNodeType) => {
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
      result.push(d.chapterId)
    })
  }
  recursion(data)
  return result
}
