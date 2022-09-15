import {
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  CodeOutlined,
  EditOutlined,
  FormOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import { QuestionType } from 'server/fetchExam/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateQuestionHeaderWrapper } from './CreateQuestionHeaderStyle'
export const CreateQuestionHeader: React.FC = () => {
  const navigate = useNavigate()
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
      <CreateQuestionHeaderWrapper>
        <Button
          icon={<ArrowLeftOutlined />}
          type="primary"
          style={{marginLeft: '30px'}}
          size="large"
          danger
          onClick={() => navigate('/questionbank')}
        >返回</Button>
        {QuestionItemList.map((item, index) => (
          <Button
            key={index}
            icon={item.icon}
            type="primary"
            style={{marginLeft: '30px'}}
            size="large"
            onClick={() => {
              // navigate(item.type, { replace: true })
            }}
          >{item.title}</Button>
        ))}
      </CreateQuestionHeaderWrapper>
    </>
  )
}
