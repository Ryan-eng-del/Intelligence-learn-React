import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from 'server'
import { message } from 'antd'
import { delayFetch } from 'util/delayFetch'
import { TestPaper, PostTestPaper, QuestionType } from '../types'
import { dropRight } from 'lodash'
import { config } from '../config'

/** 打开一张试卷 */
export const useShowTestPaper = (paperId: string, callback: any) => {
  const Process = (data: TestPaper) => {
    // 接下来进行数据分组
    // get enum type value and key ,
    // e.g.: enum { 'name1', 'name2' } => ['0','1','name1','name2']
    const QuestionTypeList = Object.keys(QuestionType)
    // remove:  ['0','1','name1','name2'] => [ 0, 1 ]
    const QuestionTypeList2 = dropRight(QuestionTypeList, QuestionTypeList.length / 2).map((i) => parseInt(i))
    return QuestionTypeList2.map((Type: QuestionType) => {
      // 获取类型
      // 这里是过滤了类型的WholeQuestion[]
      const thisTypeList = data.questionOfPaperVos.filter((i) => i.questionType === Type)
      return {
        type: Type,
        name: config[Type].name,
        min: config[Type].min,
        max: config[Type].max,
        defaultScore: config[Type].defaultScore,
        amount: thisTypeList.length,
        isExists: thisTypeList.length !== 0,
        questiton: thisTypeList.map((i: any) => ({
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
        url: `paper/show-paper-preview`,
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
    }
  )
}
