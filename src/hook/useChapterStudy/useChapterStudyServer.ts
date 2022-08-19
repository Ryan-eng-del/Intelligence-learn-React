import { useQueryClient } from '@tanstack/react-query'
import {
  useAddChapter,
  useAddChildChapter,
  useDeleteChapter,
  useShowCreateChapter
} from '../../server/fetchChapter'

export const useChapterServer = (setExpandKeys: any) => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useShowCreateChapter(setExpandKeys)
  const { mutate: addChildChapterMutate, data: addChildChapterData } =
    useAddChildChapter(data)
  const { mutate: addChapterMutate, data: addChapterData } = useAddChapter()
  const { mutate: deleteChapterMutate } = useDeleteChapter({ data })
  return {
    data,
    isLoading,
    addChapterMutate,
    deleteChapterMutate,
    addChildChapterMutate,
    addChildChapterData,
    addChapterData,
    queryClient
  }
}
