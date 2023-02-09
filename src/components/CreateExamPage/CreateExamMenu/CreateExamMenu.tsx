import { Button, Drawer, Rate } from 'antd'
import React, { useState } from 'react'
import { config } from 'server/fetchExam/config'
import { QuestionConstantString, QuestionType, QuestionTypeAction } from 'server/fetchExam/types'

import {
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FormOutlined,
  HddOutlined
} from '@ant-design/icons'
import { QuestionBankTable } from 'components/QuestionBankPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import Skeletons from 'publicComponents/Skeleton'
import { IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { useShowCreateQuestion, useShowQuestionDetails } from 'server/fetchExam'
import styled from 'styled-components'

export const QuestionICON = {
  [QuestionType.single]: { title: '单选题', icon: <CheckCircleOutlined /> },
  [QuestionType.multiple]: { title: '多选题', icon: <CheckSquareOutlined /> },
  [QuestionType.fillBlank]: { title: '填空题', icon: <EditOutlined /> },
  [QuestionType.shortAnswer]: { title: '简答题', icon: <FormOutlined /> },
  [QuestionType.judge]: { title: '判断题', icon: <CheckOutlined /> }
}
const isConstantString = (val: unknown): val is QuestionConstantString => typeof val === 'string'

export const CreateExamMenu: React.FC<{
  addQuestionType: (type: QuestionConstantString) => void
  // 用于在题库中选择题目
  dispatchQuestionType?: React.Dispatch<IQuestionTypeAction>
}> = ({ addQuestionType, dispatchQuestionType }) => {
  const courseId = useCurrentClassInfo().classInfo.courseId
  const { data } = useShowCreateQuestion(courseId)
  const [open, setOpen] = useState(false)
  const select = (id: string) => {
    //    <h1>这里报invalid hook</h1>
    const { data } = useShowQuestionDetails(id)
    setOpen(false)
    if (data && dispatchQuestionType) {
      const actionType = QuestionTypeAction[data.questionType] as any
      dispatchQuestionType({
        type: actionType,
        payload: {
          ...data,
          score: 5,
          courseId,
          isStore: true
        }
      })
    }
  }

  return (
    <>
      {Object.keys(QuestionICON).map((item, index) => {
        if (isConstantString(item)) {
          return (
            <SelectQuestionTypeButton
              key={index}
              onClick={() => {
                addQuestionType(item)
              }}
            >
              {QuestionICON[item].title}
            </SelectQuestionTypeButton>
          )
        }
      })}
      <Button type="primary" icon={<HddOutlined />} style={{ marginLeft: '10px' }} onClick={() => setOpen(true)}>
        从题库中选择
      </Button>
      <Drawer width="80vw" visible={open} onClose={() => setOpen(false)}>
        <h1>这里报invalid hook</h1>
        {data ? (
          <QuestionBankTable // TODO:奇怪的类型映射。应该修改
            curData={[]}
            originData={data.map((i) => ({
              key: i.questionId,
              question: i.questionDescription,
              rate: <Rate value={i.questionDifficulty + 1} disabled count={3} />,
              type: config[i.questionType as 1 | 2 | 3 | 4 | 0]?.name,
              create_time: i.createTime,
              questionId: i.questionId,
              rightAnswer: i.rightAnswer,
              questionOption: i.questionOption
            }))}
            isAll={true}
            select={select}
          />
        ) : (
          <Skeletons size="middle" />
        )}
      </Drawer>
    </>
  )
}

export const SelectQuestionTypeButton = styled.span`
  display: inline-block;
  width: auto;
  min-width: 60px;
  height: 32px;
  border: 1px solid #dadae8;
  font-size: 14px;
  border-radius: 20px;
  text-align: center;
  line-height: 32px;
  color: #646873;
  margin: 0 10px 0 4px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;

  &:hover {
    background: #eaf0ff;
    border: 1px solid #94c1ff;
    color: #3a8bff;
  }
`

export const CreateExamMenuWrapper = styled.div`
  //background-color: white;
  //margin: 10px 0 10px 10px;
  //height: 60px;
  //padding: 10px;
  //animation: 0.7s fadeleft ease forwards;
  //border-top: 3px solid var(--border);
  //box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
  //rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`
