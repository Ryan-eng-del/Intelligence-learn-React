import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { IAddKnowledgeParam } from './types'
/*展示章节学习树*/
export const useShowKnowledgeTree = (courseId: string) => {
  return useQuery(
    ['knowledgeTree', courseId],
    async () => {
      return client.get({
        url: '/points/show',
        params: { courseId: courseId }
      })
    },
    { refetchOnMount: false }
  )
}

/* 添加根知识点 */
export const useAddKnowledgePointsAPI = () => {
  return useMutation(async ({ pointPid, pointName, courseId }: IAddKnowledgeParam) => {
    return client.post({ url: '/points/add-point', data: { pointPid, pointName, courseId } })
  })
}
/*删除知识点*/
export const useDeleteKnowledgeAPI = () => {
  return useMutation(async ({ pointIds }: { pointIds: string[] }) => {
    return client.delete({ url: '/points/delete', params: { pointIds } })
  })
}
/*更新知识点名称*/
export const useRenameKnowledgeAPI = () => {
  return useMutation(async ({ pointId, pointName }: { pointId: string; pointName: string }) => {
    return client.put({
      url: 'points/update-name',
      data: {
        pointId,
        pointName
      }
    })
  })
}

/*关联知识点*/
export const relatePrePointsAPI = (courseId: string) => {
  return useMutation(async ({ pointId, prePointId }: { pointId: string; prePointId: string[] }) => {
    return client.post({ url: '/points/pre-points', data: { pointId, prePointId, courseId } })
  })
}

/*关联知识点*/
export const relateAfterPointsAPI = (courseId: string) => {
  return useMutation(async ({ pointId, afterPointId }: { pointId: string; afterPointId: string[] }) => {
    return client.post({ url: '/points/after-points', data: { pointId, afterPointId, courseId } })
  })
}
