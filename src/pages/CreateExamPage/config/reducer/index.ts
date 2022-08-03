import { CreateExamState, CreateExamPageAction, QuestionType } from '../type'
export const initialState: CreateExamState = {
  id: '',
  List_key: 0,
  questionList: [
    {
      id: 'a1',
      type: QuestionType.single,
      amount: 0,
      isExists: false,
      children: []
    },
    {
      id: 'a2',
      type: QuestionType.multiple,
      amount: 0,
      isExists: false,
      children: []
    },
    {
      id: 'a3',
      type: QuestionType.fillBlank,
      amount: 0,
      isExists: false,
      children: []
    },
    {
      id: 'a4',
      type: QuestionType.shortAnswer,
      amount: 0,
      isExists: false,
      children: []
    },
    {
      id: 'a5',
      type: QuestionType.programming,
      amount: 0,
      isExists: false,
      children: []
    },
    {
      id: 'a6',
      type: QuestionType.judge,
      amount: 0,
      isExists: false,
      children: []
    }
  ]
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
