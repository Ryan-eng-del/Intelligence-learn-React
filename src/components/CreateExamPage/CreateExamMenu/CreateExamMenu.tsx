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
  CodeOutlined
} from '@ant-design/icons'

export const QuestionICON = {
  [QuestionType.single]:{title:'单选题',icon: <CheckCircleOutlined />},
  [QuestionType.multiple]:{title:'多选题',icon: <CheckSquareOutlined />},
  [QuestionType.fillBlank]:{title:'填空题',icon: <EditOutlined />},
  [QuestionType.shortAnswer]:{title:'简答题',icon: <FormOutlined />},
  [QuestionType.programming]:{title:'编程题',icon: <CodeOutlined />},
  [QuestionType.judge]:{title:'判断题',icon: <CheckOutlined />},
}

export const CreateExamMenu: React.FC<{
  dispatch: (type: QuestionType)=> void
}> = ({ dispatch }) => {


  return (
    <>
      <CreateExamMenuWrapper>
        {
          Object.keys(QuestionICON).map((item, index) => (
            <Button
              key={index}
              icon={QuestionICON[parseInt(item) as QuestionType].icon}
              type="primary"
              style={{ marginLeft: '10px' }}
              onClick={() => {
                dispatch(parseInt(item) as QuestionType)
              }}
            >
              {QuestionICON[parseInt(item) as QuestionType].title}
            </Button>
          ))
        }
      </CreateExamMenuWrapper>
    </>
  )
}
