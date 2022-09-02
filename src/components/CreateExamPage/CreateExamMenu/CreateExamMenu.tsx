import React from 'react'
import { CreateExamMenuWrapper } from './CreateExamMenuStyle'
import { Button } from 'antd'
import { QuestionList, QuestionType } from 'pages/CreateExamPage/config/types'
import {
  CheckOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FormOutlined,
  CodeOutlined
} from '@ant-design/icons'

export const CreateExamMenu: React.FC<any> = (props) => {
  const { questionList, dispatch } = props
  console.log(questionList)
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
    {
      title: '单选题',
      icon: <CheckCircleOutlined />,
      type: QuestionType.single
    },
    {
      title: '多选题',
      icon: <CheckSquareOutlined />,
      type: QuestionType.multiple
    },
    { title: '填空题', icon: <EditOutlined />, type: QuestionType.fillBlank },
    { title: '简答题', icon: <FormOutlined />, type: QuestionType.shortAnswer },
    { title: '编程题', icon: <CodeOutlined />, type: QuestionType.programming },
    { title: '判断题', icon: <CheckOutlined />, type: QuestionType.judge }
  ]
  return (
    <>
      <CreateExamMenuWrapper>
        {QuestionItemList.map((item, index) => (
          <Button
            key={index}
            icon={item.icon}
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              addQuestionItem(item.type)
            }}
          >
            {item.title}
          </Button>
        ))}
      </CreateExamMenuWrapper>
    </>
  )
}
