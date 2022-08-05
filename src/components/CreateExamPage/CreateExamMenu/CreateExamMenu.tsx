import React from 'react'
import { CreateExamMenuWrapper } from './CreateExamMenuStyle'
import { Button } from 'antd'
import { QuestionList } from 'pages/CreateExamPage/config/type'
export const CreateExamMenu: React.FC<any> = (props) => {
  const { questionList, dispatch } = props
  console.log(questionList)
  const addQuestionItem = (listType: string) => {
    questionList.map((item: QuestionList) => {
      if (item.type === listType) {
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
  return (
    <>
      <CreateExamMenuWrapper>
        <Button
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => {
            addQuestionItem('单选题')
          }}
        >
          单选题
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: '20px' }}
          onClick={() => {
            addQuestionItem('多选题')
          }}
        >
          多选题
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: '20px' }}
          onClick={() => {
            addQuestionItem('填空题')
          }}
        >
          填空题
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: '20px' }}
          onClick={() => {
            addQuestionItem('简答题')
          }}
        >
          简答题
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: '20px' }}
          onClick={() => {
            addQuestionItem('编程题')
          }}
        >
          编程题
        </Button>
      </CreateExamMenuWrapper>
    </>
  )
}
