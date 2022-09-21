import { useMutation } from '@tanstack/react-query'
import { addClassTimeParam } from '../../types/server/fetchChapter'
import { client } from '../index'
import { RelatePointsResource } from '../../types/server/fetchClassTime'
/*添加章节课时*/
export const useAddClassTime = () => {
  return useMutation(
    async ({
      chapter_id,
      name,
      paper_name,
      paper_id,
      resource_ids
    }: addClassTimeParam) => {
      return client.post({
        url: '/ctime/addClassTime',
        data: {
          chapter_id,
          name,
          paper_name,
          paper_id,
          resource_ids
        }
      })
    },
    {
      onSuccess: (data: any) => {}
    }
  )
}
/*上传资源并且关联知识点*/
export const useRelatePoints = ({
  related_points,
  file,
  course_id
}: RelatePointsResource) => {
  return useMutation(
    async () => {
      return client.post({
        url: '/resources/upload-course',
        data: { file },
        params: { related_points, course_id }
      })
    },
    {
      onSuccess: (data: any) => {
        console.log(data)
      }
    }
  )
}
