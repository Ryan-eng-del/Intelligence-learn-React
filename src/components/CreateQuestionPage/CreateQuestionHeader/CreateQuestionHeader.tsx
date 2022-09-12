import {
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  CodeOutlined,
  EditOutlined,
  FormOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import { QuestionType } from 'publicComponents/CreateQuestionPage/config/type'
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
        {QuestionItemList.map((item, index) => (
          <Button
            key={index}
            icon={item.icon}
            type="primary"
            style={{
              marginLeft: '30px'
            }}
            size="large"
            onClick={() => {
              navigate(item.type, { replace: true })
            }}
          >
            {item.title}
          </Button>
        ))}
        <button
          style={{ float: 'right' }}
          onClick={() => {
            navigate('/questionbank')
          }}
        >
          返回
        </button>
      </CreateQuestionHeaderWrapper>
    </>
  )
}
