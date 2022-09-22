import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { delayFetch } from 'util/delayFetch'
import { generateExpandKeys } from '../../util/chapterStudyTree'
import { StateSetter } from 'types'
import { ChapterNodeType } from './types'
import {
  AddChapterParam,
  addClassTimeParam,
  EditChapterParam
} from '../../types/server/fetchChapter'
import { AddContentResource } from '../../types/server/fetchClassTime'
import { message } from 'antd'
//? ts的类型约束在网络请求方面起到了什么样的约束？
/*获取章节学习树信息*/
export const useShowChapter = (setExpandKeys: StateSetter<string[]>) => {
  return useQuery(['chapterTree'], async () => {
    await delayFetch()
    const data: ChapterNodeType[] = await client.get({
      url: 'chapter/getChapter'
    })
    if (setExpandKeys) setExpandKeys(generateExpandKeys(data))
    return data
  })
}
/*删除章节树节点*/
export const useDeleteChapter = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/chapter/deleteChapter/${id}` })
  })
}
/*确认添加章节树根节点*/
export const useAddChapter = (setCurNode: any) => {
  return useMutation(
    async ({ name, course_id }: AddChapterParam) => {
      return client.post({
        url: '/chapter/addChapter',
        data: { name, course_id, pid: '-1' }
      })
    },
    {
      onSuccess: (data: any) => {
        /*通过data取到id，通过setCurNode来修改*/
        setCurNode((pre: any) => {
          pre.id = data
          return pre
        })
      }
    }
  )
}
/*添加章节学习树的子目录*/
export const useAddChildChapter = (setCurNode: any) => {
  return useMutation(
    async ({ course_id, name, pid }: AddChapterParam) => {
      return client.post({
        url: '/chapter/addChapter',
        data: { course_id, name, pid }
      })
    },
    {
      onSuccess: (data: any) => {
        /*通过data取到id，通过setCurNode来修改*/
        setCurNode((pre: any) => {
          pre.id = data
          return pre
        })
      }
    }
  )
}
/*更改章节名称*/
export const useEditChapter = () => {
  return useMutation(
    async ({ chapter_id, new_name }: EditChapterParam) => {
      return client.put({
        url: '/chapter/updateChapterName',
        data: { chapter_id, new_name }
      })
    },
    {
      onSuccess: () => {
        console.log('success')
      }
    }
  )
}
/*上传课时资源*/
export const useAddContentResource = () => {
  return useMutation(
    async ({ related_points, course_id, file }: AddContentResource) => {
      return client.post({
        url: '/resources/upload-course',
        params: { course_id, related_points },
        data: { file }
      })
    }
  )
}
