import { CreateExamState, CreateExamPageAction } from '../types'
import { QuestionType } from 'server/fetchExam/types'

//用于生成初始题目容器
const qlist = [
  QuestionType.single,
  QuestionType.multiple,
  QuestionType.fillBlank,
  QuestionType.shortAnswer,
  QuestionType.programming,
  QuestionType.judge
]

export const initialState: CreateExamState = {
  id: '',
  List_key: 0,
  questionList: qlist.map((i, index) => ({
    id: index.toString(),
    type: i,
    amount: 0,
    isExists: false,
    questiton: [],
    questitonScore: []
  })),
  curEdit: {
    questionId: "9",
    questionDescription: "in",
    questionAnswer: "et",
    questionDifficulty: 57,
    questionType: QuestionType.single,
    questionAnswerNum: 74,
    rightAnswer: "est",
    questionAnswerDescription: "nulla aliquip",
    createTime: "2022-08-03 09:38:25",
    points: [
        "ea deserunt fugiat est",
        "commodo",
        "anim",
        "consectetur nostrud dolor"
    ]
  }
}


export const CreateExamPageReducer = (
  state: CreateExamState,
  action: CreateExamPageAction
) => {
  const newState = { ...state }
  const { questionList } = newState
  const newquestionList = [...questionList]
  switch (action.type) {
    case 'changeIsExists': //修改是否存在的状态
      newquestionList.map((item) => {
        if (item.type === action.listType) {
          item.isExists = action.isExists
        }
      })
      return { ...newState }
    case 'addQuestionItem': //添加题目
      newquestionList.map((item) => {
        if (item.type === action.listType) {
          item.questiton = [...item.questiton].concat(action.questionItem)
          item.amount += 1
        }
      })
      newquestionList[0].amount += 1
      return { ...newState }
    case 'removeQuestionItem': //删除题目
      newState.questionList.map((questionPanel) => {
        if (questionPanel.type === action.listType) {
          questionPanel.questiton = questionPanel.questiton.filter((item_two) => {
            return item_two.item_key != action.id
          })
          questionPanel.amount -= 1
          questionPanel.isExists = questionPanel.amount === 0
        }
      })
      return { ...newState }
    case 'rearrangeItem': //重新排序
      newState.questionList.map((item_one) => {
        let key = 1
        item_one.questiton.map((item_two) => {
          item_two.item_key = key.toString()
          key++
        })
      })
      return { ...newState }
    case 'removeQuestionList':
      newState.questionList.map((item) => {
        if (item.type === action.listType) {
          item.questiton = []
        }
      })
      return { ...newState }
    default:
      throw new Error()
  }
}
