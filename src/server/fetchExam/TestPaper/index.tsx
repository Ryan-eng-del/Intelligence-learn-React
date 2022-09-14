import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { delayFetch } from 'util/delayFetch'
import { TestPaper, PostTestPaper } from '../types'

/** 创建一张试卷 */
export const useAddTestPaper = (courseId: string) => {
  const navigate = useNavigate()
  return useMutation(async () => {
    await delayFetch()
    return client.post({
      url: 'paper/add-paper',
      data:{
        paper_name: "新建试卷",
        course_id: courseId,
        paper_type: 1,
        questions_ids: [],
        questions_score: []
      }
    })
  },
  {
    onSuccess: (PaperID,a,b) => {
      console.log("先跳转？",PaperID,a,b);
      navigate(`/editpaper/${PaperID}`)
    },
    onError: () => {
      message.error('添加失败')
    }
  })
}

/** 打开一张试卷 */
export const useShowTestPaper = (paperId?: string) => useQuery(
  ['currentOpenTestPaper'], async () => {
    await delayFetch()
    const data = client.get<TestPaper>({
      url: `paper/show-paper-detail`,
      params: {
        id: paperId
      }
    })
    return data;
  }
)

/** 保存这张试卷 */
export const useSaveTestPaper = (paper: PostTestPaper) => {
  return useMutation(async () => {
    await delayFetch()
    return client.post({
      url: '/paper/update-paper',
      data: paper
    })
  },
  {
    onSuccess: () => {
      message.success('保存成功')
    },
    onError: () => {
      message.error('保存失败')
    }
  })
}