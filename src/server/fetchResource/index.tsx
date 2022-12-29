import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { ChapterResourceType } from '../fetch3rd/fetchChapter/types'

export const useGetResource = (resourceId: string) => {
  return useQuery<ChapterResourceType>(['resource', resourceId], async () => {
    return client.get({ url: `/resources/get-resource/${resourceId}` })
  })
}

export const useUploadVideo = () => {
  return useMutation(
    async ({ videoId, relatePoints, courseId }: { videoId: string; courseId: string; relatePoints: string[] }) => {
      return client.post({
        url: '/resources/upload-video',
        data: {
          videoId,
          relatePoints,
          courseId
        }
      })
    }
  )
}
