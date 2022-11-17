import React, { useMemo, useState } from 'react'
import { Collapse } from 'antd'
import { QuestionActionString } from 'server/fetchExam/types'
import styled from 'styled-components'
import { getQuestionHeader } from '../../../pages/CreateExamPage/util/util'
import { IQuestionType, IQuestionTypeInitialState } from '../../../reducer/CreateExamPaper/type/type'
import React, { useState } from 'react'
import {
  CreateExamNavWrapper,
  QuestionItemWrapper,
  DeleteButtonWrapper
} from './CreateExamNavStyle'
import { Collapse, Button, Popconfirm,  InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import {
  QuestionItem,
  QuestionList,
} from 'server/fetchExam/types'
import { AnyFn } from 'types'
import { QuestionICON } from '../CreateExamMenu/CreateExamMenu'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { Config } from './Config'

const { Panel } = Collapse

export interface CreateExamNavProps {
  setCurEdit: (curEdit: IQuestionType) => void
  questionTypeState: IQuestionTypeInitialState<IQuestionType>
  setCurOrder: (curOrder: number) => void
  curEditQuestion: IQuestionType
}

export const CreateExamNav = (props: CreateExamNavProps) => {
  const { questionTypeState, setCurEdit, setCurOrder, curEditQuestion } = props
  const [curId, setCurId] = useState('')

  /*编辑试卷类型*/
  const editQuestionType = (question: IQuestionType, index: number) => {
    setCurEdit(question)
    setCurId(question.questionId)
    setCurOrder(index)
export const CreateExamNav: React.FC<{
  isLoading: boolean
  questionList: QuestionList[]
  setConfig: () => void
  changeScore: AnyFn<void>
  focus: (item: QuestionItem) => void
  SumScore: () => number
}> = ({ questionList, focus, isLoading, SumScore, setConfig }) => {
  const [Fouce, setFouce] = useState<QuestionItem>()
  const removeQuesItem = (curItem: QuestionItem, curList: QuestionList) => {
    curList.questiton = curList.questiton.filter((i) => i !== curItem)
    if (curList.amount === 0) {
      curList.isExists = false
    }
    setConfig()
  }

  /*试卷总题量*/
  const allQuestionCount = useMemo(() => {
    return Object.keys(questionTypeState).reduce((pre, cur) => {
      return pre + questionTypeState[cur as QuestionActionString].list.length
    }, 0)
  }, [questionTypeState, curEditQuestion])

  /*试卷总分数*/
  const allQuestionPoint = useMemo(() => {
    return Object.keys(questionTypeState).reduce((pre, cur) => {
      return (
        pre +
        questionTypeState[cur as QuestionActionString].list.reduce((pre, cur) => {
          return (pre += cur.score)
        }, 0)
      )
    }, 0)
  }, [questionTypeState, curEditQuestion])

  return (
    <>
      <ExamNavHeader>
        <span style={{ marginRight: '12px' }}>总题量：{allQuestionCount}</span>
        <span>总分数：{allQuestionPoint}</span>
      </ExamNavHeader>
      <Collapse
        bordered={false}
        expandIconPosition="end"
        className="collapse"
        ghost={true}
        defaultActiveKey={Object.keys(questionTypeState).map((_, index) => index)}
      >
        {Object.keys(questionTypeState).map((type, index) => {
          const questionTypeKey = questionTypeState[type as QuestionActionString]
          return (
            questionTypeKey.list.length && (
              <Panel
                key={index}
                header={
                  <PanelHeader>
                    <span style={{ marginRight: '7px' }}>{getQuestionHeader(index)}</span>（共
                    {questionTypeKey.list.length}题
                    <span>
                      {questionTypeKey.list.reduce((pre, now) => {
                        return (pre += now.score)
                      }, 0)}
                      分）
                    </span>
                  </PanelHeader>
                }
              >
                {questionTypeKey.list.map((question, index) => {
                  return (
                    <QuestionTypeWrapper
                      className={curId === question.questionId ? 'active' : 'noActive'}
                      key={question.questionId}
                      onClick={(e) => {
                        editQuestionType(question, index + 1)
                      }}
                    >
                      <span style={{ marginRight: '3px' }}>{index + 1}</span>
                      <span>({question.score}分)</span>
                    </QuestionTypeWrapper>
                  )
                })}
              </Panel>
            )
          )
        })}
      </Collapse>
    </>
  )
}

export const QuestionTypeWrapper = styled.div`
  height: 32px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => (props.className === 'active' ? '#3a8bff' : '#646873')};
  position: relative;
  background: ${(props) => (props.className === 'active' ? '#f0f6ff' : 'white')};

  &:hover {
    background-color: rgb(247, 250, 252);
  }
}
`
export const PanelHeader = styled.div`
  font-size: 13px;
`
export const ExamNavHeader = styled.div`
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  color: #a8a8b3;
  padding-left: 16px;
`
