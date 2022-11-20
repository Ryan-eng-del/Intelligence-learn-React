import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { generateExpandKeys } from '../../helper/chapterStudyTree'
import { AddChapterParam, EditChapterParam } from '../../types/server/fetchChapter'
import { AddContent, AddContentResource, EditContent } from '../../types/server/fetchClassTime'
import { ChapterTreeData } from '../../hook/useChapterStudy/type'
import React from 'react'
import { IChapterReducerAction } from '../../reducer/ChaperStudyTree/type/type'
/*获取章节学习树信息*/
export const useShowChapter = (courseId: string, dispatch: React.Dispatch<IChapterReducerAction>) => {
  return useQuery(['chapterTree', courseId], async () => {
    if (courseId === '') return
    console.log('发送了')
    const data: ChapterTreeData[] = await client.get({
      url: 'chapter/getChapter',
      params: { courseId }
    })
    dispatch({ type: 'setExpandKeys', expandKeys: () => generateExpandKeys(data) })
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
  return useMutation(async ({ relatedPoints, CourseId, file }: AddContentResource) => {
    return client.post({
      url: '/resources/upload-course',
      params: { CourseId, relatedPoints },
      data: { file }
    })
  })
}
/* 添加课时 */
export const useAddContent = () => {
  return useMutation(async ({ chapter_id, name, resource_ids, paper_id, paper_name }: AddContent) => {
    return client.post({
      url: '/ctime/addClassTime',
      data: {
        chapter_id,
        name,
        resource_ids,
        paper_id,
        paper_name
      }
    })
  })
}
/* 删除课时 */
export const useDeleteClassTime = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/ctime/deleteClassTime/${id}` })
  })
}
/*删除资源*/
export const useDeleteResource = () => {
  return useMutation(async (id: string) => {
    return client.delete({ url: `/resources/delete/${id}` })
  })
}
/* 编辑课时 */
export const useEditClassTime = () => {
  return useMutation(async ({ chapter_id, class_time_id, name, paper_id, paper_name, resource_ids }: EditContent) => {
    return client.put({
      url: '/ctime/updateClassTime',
      data: {
        chapter_id,
        class_time_id,
        name,
        paper_id,
        paper_name,
        resource_ids
      }
    })
  })
}
