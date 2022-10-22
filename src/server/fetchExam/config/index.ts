import { QuestionType } from '../types'

export const config = {
  [QuestionType.single]: {
    name: '单选题',
    min: 1,
    max: 10,
    defaultScore: 1
  },
  [QuestionType.multiple]: {
    name: '多选题',
    min: 1,
    max: 10,
    defaultScore: 2
  },
  [QuestionType.fillBlank]: {
    name: '填空题',
    min: 1,
    max: 10,
    defaultScore: 5
  },
  [QuestionType.shortAnswer]: {
    name: '简答题',
    min: 1,
    max: 10,
    defaultScore: 10
  },
  [QuestionType.judge]: {
    name: '判断题',
    min: 1,
    max: 10,
    defaultScore: 1
  }
}
