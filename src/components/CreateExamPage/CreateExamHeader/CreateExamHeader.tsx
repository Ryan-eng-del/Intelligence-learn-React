import React from 'react'
import { CreateExamHeaderWrapper } from './CreateExamHeaderStyle'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export const CreateExamHeader: React.FC<any> = (props) => {
  const { state, dispatch } = props
  const navigate = useNavigate()
  return (
    <CreateExamHeaderWrapper>
      <Button
        style={{ float: 'right' }}
        onClick={() => navigate('/classinfo/exam', { state })}
      >
        保存
      </Button>
    </CreateExamHeaderWrapper>
  )
}
