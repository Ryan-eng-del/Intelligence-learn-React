import { CreateExamState, CreateExamPageAction } from '../types'
import { QuestionType } from 'publicComponents/CreateQuestionPage/config/type'

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
    children: []
  }))
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
          item.children = [...item.children].concat(action.questionItem)
          item.amount += 1
        }
      })
      newquestionList[0].amount += 1
      return { ...newState }
    case 'removeQuestionItem': //删除题目
      newState.questionList.map((item_one) => {
        if (item_one.type === action.listType) {
          item_one.children = item_one.children.filter((item_two) => {
            return item_two.id != action.id
          })
          item_one.amount -= 1
        }
      })
      return { ...newState }
    case 'rearrangeItem': //重新排序
      newState.questionList.map((item_one) => {
        let key = 1
        item_one.children.map((item_two) => {
          item_two.item_key = key
          key++
        })
      })
      return { ...newState }
    case 'removeQuestionList':
      newState.questionList.map((item) => {
        if (item.type === action.listType) {
          item.children = []
        }
      })
      return { ...newState }
    default:
      throw new Error()
  }
}
