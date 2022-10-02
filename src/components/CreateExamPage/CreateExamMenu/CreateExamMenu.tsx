import React from 'react'
import { CreateExamMenuWrapper } from './CreateExamMenuStyle'
import { Button } from 'antd'
import { QuestionList, QuestionType } from 'server/fetchExam/types'

import {
  CheckOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FormOutlined,
  CodeOutlined,
  ArrowLeftOutlined,
  HddOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const QuestionICON = {
  [QuestionType.single]: { title: '单选题', icon: <CheckCircleOutlined /> },
  [QuestionType.multiple]: { title: '多选题', icon: <CheckSquareOutlined /> },
  [QuestionType.fillBlank]: { title: '填空题', icon: <EditOutlined /> },
  [QuestionType.shortAnswer]: { title: '简答题', icon: <FormOutlined /> },
  [QuestionType.judge]: { title: '判断题', icon: <CheckOutlined /> }
}

export const CreateExamMenu: React.FC<{
  allowBank?: boolean
  AddQuestion: (type: QuestionType) => void
}> = ({ AddQuestion, allowBank }) => {
  const navigate = useNavigate()

  return (
    <>
      <CreateExamMenuWrapper>
        {allowBank ? (
          <Button
            type="primary"
            icon={<HddOutlined />}
            style={{ marginLeft: '10px' }}
          >
            从题库中选择
          </Button>
        ) : (
          <Button
            danger
            icon={<ArrowLeftOutlined />}
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => navigate('/classinfo/questionbank', { replace: true })}
          >
            返回
          </Button>
        )}
        {Object.keys(QuestionICON).map((item, index) => (
          <Button
            key={index}
            icon={QuestionICON[parseInt(item) as QuestionType].icon}
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              AddQuestion(parseInt(item) as QuestionType)
            }}
          >
            {QuestionICON[parseInt(item) as QuestionType].title}
          </Button>
        ))}
      </CreateExamMenuWrapper>
    </>
  )
}
