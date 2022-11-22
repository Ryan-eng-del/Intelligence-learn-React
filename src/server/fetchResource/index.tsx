import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { ChapterResourceType } from '../fetchChapter/types'

export const useGetResource = (resourceId: string) => {
  return useQuery<ChapterResourceType>(['resource', resourceId], async () => {
    return client.get({ url: `/resources/get-resource/${resourceId}` })
  })
}

export const useGetAliAuth = () => {
  return useMutation(['aliYunAuth'], async (originName: string) => {
    return client.get({ url: '/resources/upload-video-auth', params: { originName } })
  })
}
