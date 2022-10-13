import React, { useState } from 'react'
import {
  CreateExamNavWrapper,
  QuestionItemWrapper,
  DeleteButtonWrapper
} from './CreateExamNavStyle'
import { Collapse, Button, Popconfirm, Tooltip, InputNumber } from 'antd'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { QuestionItem, QuestionList, QuestionType } from 'server/fetchExam/types'
import { AnyFn } from 'types'
import { QuestionICON } from '../CreateExamMenu/CreateExamMenu'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { Config } from './Config'

const { Panel } = Collapse

export const CreateExamNav: React.FC<{
  isLoading: boolean
  questionList: QuestionList[]
  setConfig:()=>void
  changeScore: AnyFn<void>
  focus: (item: QuestionItem) => void
  SumScore:()=>number
}> = ({ questionList, focus, isLoading,SumScore, setConfig }) => {
  const [Fouce, setFouce] = useState<QuestionItem>()
  const removeQuesItem = (curItem: QuestionItem, curList: QuestionList) => {
    curList.questiton = curList.questiton.filter(i=>i!==curItem)
    if (curList.amount === 0) {
      curList.isExists = false
    }
    setConfig()
  }
  const removeCollapse = (curList: QuestionList) => {
    curList.amount = 0;
    curList.isExists = false;
    curList.questiton = [];
    setConfig()
  }
  return (
    <>
      <CreateExamNavWrapper>
        <Config
          config={questionList}
          setConfig={setConfig}
          SumScore={SumScore}
        ></Config>
        {isLoading ? <BaseLoading /> : <></>}
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="collapse"
          defaultActiveKey={questionList.map((item) => item.type)}
        >
          {questionList.map((QuestionPanel) =>
            QuestionPanel.isExists ? (
              <Panel
                header={`${QuestionICON[QuestionPanel.type].title}(${
                  QuestionPanel.amount
                })`}
                key={QuestionPanel.type}
                extra={
                  <>
                    <DeleteButton
                      title={`确认移除整个组吗，这将移除里面全部${QuestionPanel.type}`}
                      confirm={()=>removeCollapse(QuestionPanel)}
                    />
                  </>
                }
              >
                {QuestionPanel.questiton.map((questionItem, index) => (
                  <QuestionItemWrapper
                    key={questionItem.item_data.questionId}
                    style={{
                      backgroundColor:
                        Fouce === questionItem ? 'rgb(238, 237, 237)' : '#fff'
                    }}
                  >
                    <Button
                      type="link"
                      // 创建的题目并不一定已经保存，暂时用一个字段记录
                      style={{ color: 'red', width: '50%' }}
                      onClick={() => (
                        setFouce(questionItem), focus(questionItem)
                      )}
                    >
                      {index + 1}
                      {/* {questionItem.item_data.questionId} */}
                    </Button>
                    {/* 分数控制 */}
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={questionItem.score}
                      bordered={false}
                      style={{ width: '25%' }}
                    />

                    {/* 删除按钮 */}
                    <DeleteButton
                      confirm={() =>
                        removeQuesItem(questionItem, QuestionPanel)
                      }
                      title="从试卷中移除这道题目？如果题目来源于题库，这并不会删除题目"
                    />
                  </QuestionItemWrapper>
                ))}
              </Panel>
            ) : (
              <div key={QuestionPanel.type}></div>
            )
          )}
        </Collapse>
      </CreateExamNavWrapper>
    </>
  )
}

const DeleteButton: React.FC<{
  confirm: AnyFn
  title: string
}> = ({ confirm, title }) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={(e) => {
        e?.stopPropagation()
        confirm()
      }}
      okText="是"
      cancelText="否"
    >
      <DeleteButtonWrapper>
        <DeleteOutlined className="delete" />
      </DeleteButtonWrapper>
    </Popconfirm>
  )
}
