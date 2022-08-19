import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { deleteTreeNode, generateExpandKeys } from '../../util/chapterStudyTree'
import { message } from 'antd'
/*展示章节学习树*/
export const useShowCreateChapter = (setExpandKeys: any) => {
  return useQuery(['chapterTree'], async () => {
    await delayFetch()
    const data = await client.get({
      url: '18796758'
    })
    setExpandKeys(generateExpandKeys(data))
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
      onSettled: () => {
        message.success('删除成功')
      },
      onError: (error, variables, context) => {
        if (context?.previousClass) {
          queryClient.setQueryData(['class'], context.previousClass)
        }
      }
    }
  )
}
/*添加章节树根节点*/
export const useAddChapter = () => {
  return useMutation(async () => {
    return client.post({ url: '19680940' })
  })
}
/*确认添加章节树根节点*/
export const useConfirmAddChapter = ({
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
