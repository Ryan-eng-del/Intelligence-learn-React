import React, { useState } from 'react'
import {
  CreateExamNavWrapper,
  QuestionItemWrapper,
  DeleteButtonWrapper
} from './CreateExamNavStyle'
import { Collapse, Button, Popconfirm, Tooltip, InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { QuestionItem, QuestionList } from 'server/fetchExam/types'
import { AnyFn } from 'types'
import { QuestionICON } from '../CreateExamMenu/CreateExamMenu'

const { Panel } = Collapse

export const CreateExamNav: React.FC<{
  questionList: QuestionList[]
  changeScore: AnyFn<void>
  focus: (item: QuestionItem) => void
}> = ({ questionList, focus, changeScore }) => {
  const [data, setData] = useState(questionList)
  const [Fouce, setFouce] = useState<QuestionItem>()
  const removeQuesItem = (curItem: QuestionItem, curList: QuestionList) => {
    if (curList.amount === 0) {
      console.log()
    }
  }

  return (
    <>
      <CreateExamNavWrapper>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="collapse"
          defaultActiveKey={data.map((item) => item.type)}
        >
          {data.map((QuestionPanel) =>
            QuestionPanel.isExists ? (
              <Panel
                header={QuestionICON[QuestionPanel.type].title}
                key={QuestionPanel.type}
                extra={
                  <DeleteButton
                    title={`确认移除整个组吗，这将移除里面全部${QuestionPanel.type}`}
                    confirm={() => console.log('删除了整个组！')}
                  />
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
