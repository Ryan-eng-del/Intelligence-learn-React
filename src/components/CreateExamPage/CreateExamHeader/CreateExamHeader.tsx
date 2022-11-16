import React from 'react'
import { Button, Input, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { IQuestionType, IQuestionTypeInitialState } from '../../../reducer/CreateExamPaper/type/type'
import { QuestionActionString } from '../../../server/fetchExam/types'

interface CreateExamHeaderProps {
  questionTypeState: IQuestionTypeInitialState<IQuestionType>
}

export const CreateExamHeader = (props: CreateExamHeaderProps) => {
  const { questionTypeState } = props
  const navigate = useNavigate()
  /*完成保存试卷*/
  const handleOnStorePaper = () => {
    let countNoSave = 0
    Object.keys(questionTypeState).forEach((item) => {
      questionTypeState[item as QuestionActionString].list.forEach((qs) => {
        if (!qs.isStore) countNoSave++
      })
    })
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="middle" onClick={() => notification.close(key)}>
        知道啦
      </Button>
    )

    notification.open({
      message: '试卷保存👋',
      description: (
        <div>
          试卷当中还有 <span style={{ fontSize: '18px', padding: '0 7px' }}>{countNoSave}</span> 道题还没有保存
        </div>
      ),
      placement: 'top',
      onClick: () => {
        console.log('Notification Clicked!')
      },
      btn,
      key
    })
  }
  return (
    <ExamHeader>
      <Button type="primary" shape="circle" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}></Button>
      <InputWrapper>
        <label htmlFor={'paperName'}>试卷名称：</label>
        <Input defaultValue={'新建试卷'} id={'paperName'} />
      </InputWrapper>
      <Button type="primary" onClick={() => handleOnStorePaper()}>
        完成
      </Button>
    </ExamHeader>
  )
}
export const ExamHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  padding: 5px 15px 5px 15px;
  background-color: white;
  border-radius: 8px;
`
const InputWrapper = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 12px;

  label {
    min-width: 100px;
    line-height: 37px;
  }

  display: flex;
`
