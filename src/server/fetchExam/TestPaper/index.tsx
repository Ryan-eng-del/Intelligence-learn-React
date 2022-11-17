import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { message } from 'antd'
import { delayFetch } from 'util/delayFetch'
import { TestPaper, PostTestPaper, QuestionType, StudentPaper } from '../types'
import { AnyFn } from 'types'
import { dropRight } from 'lodash'
import { config } from '../config'

/** 创建一张试卷 */
export const useAddTestPaper = (callback: AnyFn) => {
  return useMutation(
    async (courseId: string) => {
      await delayFetch()
      return client.post({
        url: '/paper/teacher/create',
        data: {
          paper_name: '新建试卷',
          course_id: courseId,
          paper_type: 1,
          questions_ids: [],
          questions_score: []
        }
      })
    },
    {
      onSuccess: (data) => {
        callback(data)
        message.success('添加成功')
      },
      onError: () => {
        message.error('添加失败')
      }
    }
  )
}

/** 打开一张试卷 */
export const useShowTestPaper = (paperId: string, callback: any) => {
  const Process = (data: TestPaper) => {
    // 接下来进行数据分组
    // get enum type value and key ,
    // e.g.: enum { 'name1', 'name2' } => ['0','1','name1','name2']
    const QuestionTypeList = Object.keys(QuestionType)
    // remove:  ['0','1','name1','name2'] => [ 0, 1 ]
    const QuestionTypeList2 = dropRight(
      QuestionTypeList,
      QuestionTypeList.length / 2
    ).map((i) => parseInt(i))
    return QuestionTypeList2.map((Type: QuestionType) => {
      // 获取类型
      // 这里是过滤了类型的WholeQuestion[]
      const thisTypeList = data.questionOfPaperVos.filter(
        (i) => i.questionType === Type
      )
      return {
        type: Type,
        name: config[Type].name,
        min: config[Type].min,
        max: config[Type].max,
        defaultScore: config[Type].defaultScore,
        amount: thisTypeList.length,
        isExists: thisTypeList.length != 0,
        questiton: thisTypeList.map((i) => ({
          score: 1,
          item_key: i.questionId,
          item_data: { ...i, courseId: 'unknown' } // FIXME: 等待接口更新courseID字段
        }))
      }
    })
  }
  const data = useQuery(
    [`TestPaper-${paperId}`],
    async () => {
      await delayFetch()
      return client.get<TestPaper>({
        url: `/paper/teacher/paper-preview`,
        params: {
          id: paperId
        }
      })
    },
    {
      onSuccess: (data) => {
        callback(Process(data!))
      }
    }
  )
  // callback(Process(data.data!))
  return data
}

/** 保存这张试卷 */
export const useSaveTestPaper = () => {
  return useMutation(
    async (paper: PostTestPaper) => {
      await delayFetch()
      return client.post({
        url: '/paper/teacher/update',
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
    }
  )
}

/** 学生获取到试卷 */
export const useShowQuestionForStudent = (id: string) => {
  return useQuery([`paperdoing-${id}`], () => {
    return client.get<StudentPaper>({
      url: `/paper/stu/paper-detail/${id}`,
      params: { paperId:id }
    })
  })
}

/** 学生提交试卷 */
export const useSubmitTestPaper = () => {
  return useMutation(
    async (paper: {questionId:string,studentAnswer:string}[]) => {
      await delayFetch()
      return client.post({
        url: '/paper/stu/submit',
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
    }
  )
}
