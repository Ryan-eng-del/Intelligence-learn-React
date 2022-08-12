import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { ChapterListType } from '../types'
export const useChapterList = (courseId: string) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation(
    async () => {
      await delayFetch() //  模拟延时
      return client.post<{ ChapterList: ChapterListType }>({
        url: '18796758',
        data: { courseId: courseId }
      })
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([`ChapterList-${courseId}`], data)
        console.log('onSuccess', data)
        navigate('/classinfo/chapter')
      }
    }
  )
}
