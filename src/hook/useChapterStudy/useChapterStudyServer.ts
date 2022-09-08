import { useQueryClient } from '@tanstack/react-query'
import { StateSetter } from 'types'
import {
  useAddChildChapter,
  useConfirmAddChapter,
  useDeleteChapter,
  useShowCreateChapter
} from '../../server/fetchChapter'
import { ChapterNodeType, CourTimeType } from 'server/fetchChapter/types'

export const useChapterServer = (
  setExpandKeys: StateSetter<string[]>,
   setCurNode: StateSetter<ChapterNodeType | CourTimeType>
) => {
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
