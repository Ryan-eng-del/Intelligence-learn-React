import { useQueryClient } from '@tanstack/react-query'
import {
  useAddChildChapter,
  useConfirmAddChapter,
  useDeleteChapter,
  useShowCreateChapter
} from '../../server/fetchChapter'

export const useChapterServer = (setExpandKeys: any, setCurNode: any) => {
  const { mutate: addChapterMutate, data: addChapterData } =
    useConfirmAddChapter(setCurNode)
  const queryClient = useQueryClient()
  const { data, isLoading } = useShowCreateChapter(setExpandKeys)
  const { mutate: addChildChapterMutate, data: addChildChapterData } =
    useAddChildChapter(data)
  const { mutate: deleteChapterMutate } = useDeleteChapter({ data })
  return {
    data,
    isLoading,
    deleteChapterMutate,
    addChildChapterMutate,
    addChildChapterData,
    queryClient,
    addChapterMutate,
    addChapterData
  }
}
