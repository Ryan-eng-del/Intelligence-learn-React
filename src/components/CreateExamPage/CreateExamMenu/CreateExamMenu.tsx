import React from 'react'
// !!!!
import { CreateExamMenuWrapper } from './CreateExamMenuStyle'
import { Button } from 'antd'
import { QuestionList, QuestionType } from 'pages/CreateExamPage/config/type'
export const CreateExamMenu: React.FC<any> = (props) => {
  const { questionList, dispatch } = props
  console.log(questionList);
  const addQuestionItem = (listType: QuestionType) => {
    questionList.map((item: QuestionList) => {
      if (item.type == listType) {
        if (item.isExists === false) {
          dispatch({ type: 'changeIsExists', isExists: true, listType })
        }
        dispatch({
          type: 'addQuestionItem',
          questionItem: {
            id: item.children.length + 1, //id向后台请求
            item_key: item.children.length + 1
          },
          listType
        })
      }
    })
  }
  const QuestionItemList = [
    {title:"单选题",type:QuestionType.single},
    {title:"多选题",type:QuestionType.multiple},
    {title:"填空题",type:QuestionType.fillBlank},
    {title:"简答题",type:QuestionType.shortAnswer},
    {title:"编程题",type:QuestionType.programming},
  ]
  return (
    <>
      <CreateExamMenuWrapper>
        {
          QuestionItemList.map((item, index)=>(
            <Button key={index}
              type="primary"
              style={{ marginLeft: '10px' }}
              onClick={() => {
                addQuestionItem(item.type)
              }}
            >
              {item.title}
            </Button>
          ))
        }
      </CreateExamMenuWrapper>
    </>
  )
}
