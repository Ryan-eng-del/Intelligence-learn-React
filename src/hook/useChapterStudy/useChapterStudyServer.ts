import { useQueryClient } from '@tanstack/react-query'
import { StateSetter } from 'types'
import {
  useAddChildChapter,
  useAddChapter,
  useDeleteChapter,
  useShowChapter,
  useEditChapter,
  useAddContentResource
} from '../../server/fetchChapter'
import { ChapterNodeType, CourTimeType } from 'server/fetchChapter/types'
import { useAddContent } from '../../server/fetchChapter/index'

export const useChapterServer = (
  setExpandKeys: StateSetter<string[]>,
  setCurNode: StateSetter<ChapterNodeType | CourTimeType>
) => {
  /*query容器*/
  const queryClient = useQueryClient()
  const { data, isLoading } = useShowChapter(setExpandKeys)
  /*展示子章节*/
  const { mutateAsync: addChildChapterMutate } = useAddChildChapter(setCurNode)
  /*删除章节*/
  const { mutateAsync: deleteChapterMutate } = useDeleteChapter()
  /*添加根章节*/
  const { mutateAsync: addChapterMutate } = useAddChapter(setCurNode)
  /*编辑章节*/
  const { mutateAsync: editChapterMutate } = useEditChapter()
  /* 添加课时*/
  const { mutateAsync: addContentMutate } = useAddContent()
  /* 上传课时资源并且关联知识点
   */
  const { mutateAsync: addContentResource, data: resourceData } =
    useAddContentResource()
  return {
    addContentResource,
    data,
    resourceData,
    isLoading,
    queryClient,
    deleteChapterMutate,
    addChildChapterMutate,
    addChapterMutate,
    editChapterMutate,
    addContentMutate
  }
}
