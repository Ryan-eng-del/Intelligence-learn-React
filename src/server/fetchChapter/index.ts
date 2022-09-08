import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { deleteTreeNode, generateExpandKeys } from '../../util/chapterStudyTree'
import { message } from 'antd'
import { findIdResource } from '../../util/TeacherSourcePreviewPage'
import { StateSetter } from 'types'
import { ChapterNodeType } from './types'
/*展示章节学习树*/
export const useShowCreateChapter = (setExpandKeys: StateSetter<string[]>) => {
  return useQuery(['chapterTree'], async () => {
    await delayFetch()
    const data:ChapterNodeType[] = await client.get({
      url: 'chapter/getChapterContents'
    })
    if (setExpandKeys) setExpandKeys(generateExpandKeys(data))
    return data
  })
}
/*删除章节树节点*/
export const useDeleteChapter = ({ data }: { data: any }) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id) => {
      return client.post({ url: '19680940', data: { id } })
    },
    {
      onMutate: (id) => {
        deleteTreeNode(data, id, queryClient)
        const previousClass = queryClient.getQueryData(['chapterTree'])
        return { previousClass }
      },
      onError: (error, variables, context) => {
        if (context?.previousClass) {
          queryClient.setQueryData(['class'], context.previousClass)
        }
      }
    }
  )
}

/*确认添加章节树根节点*/
export const useConfirmAddChapter = (setCurNode: any) => {
  return useMutation(
    async ({
      name,
      course_id,
      chapter_pid
    }: {
      name: string
      course_id: string
      chapter_pid: string
    }) => {
      return client.post({
        url: 'chapter/addFirstLevelChapter',
        data: { name }
      })
    },
    {
      onSettled: (data: any) => {
        /*通过data取到id，通过setCurNode来修改*/
      }
    }
  )
}
/*添加章节学习树的子目录*/
export const useAddChildChapter = (data: any) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (object: { chapterId: any; node: any }) => {
      return client.post({
        url: '19680940'
      })
    }
    // },
    // {
    //   onMutate: (object: { chapterId: any; node: any }) => {}
    // }
  )
}
/*添加确认添加章节学习树的子目录*/
export const useConfirmAddChildChapter = ({
  chapterName,
  chapterId
}: {
  chapterId: string
  chapterName: string
}) => {
  return useMutation(
    async () => {
      return client.post({ url: '19680940', data: { chapterName, chapterId } })
    },
    {
      onSettled: () => {
        message.success('添加成功')
      }
    }
  )
}
