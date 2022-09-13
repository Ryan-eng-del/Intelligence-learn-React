import React from 'react'
import { CreateExamNavWrapper, QuestionItemWrapper } from './CreateExamNavStyle'
import { Collapse, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { QuestionItem, QuestionList } from 'pages/CreateExamPage/config/types'
import { useNavigate } from 'react-router-dom'
import { AnyFn } from 'types'
const { Panel } = Collapse

export const CreateExamNav: React.FC<{
  questionList: QuestionList[]
  dispatch: AnyFn
}> = (props) => {

  const { questionList, dispatch } = props
  const removeQuesItem = (curItem: QuestionItem, curList: QuestionList) => {
    if (curList.amount === 0) {
      dispatch({
        type: 'changeIsExists',
        isExists: false,
        listType: curList.type
      })
    }
    dispatch({
      type: 'removeQuestionItem',
      listType: curList.type,
      key: curItem.item_key,
      id: curItem.id
    })
    dispatch({ type: 'rearrangeItem' })
  }

  return (
    <>
      <CreateExamNavWrapper>
        <Button
          onClick={()=> dispatch({type:'AddNewQuestion'})}
        >神奇按钮</Button>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className='collapse'
          defaultActiveKey={questionList.map((item) => item.id)}
          >
          {questionList.map(QuestionPanel => QuestionPanel.isExists
            ? <Panel
            header={QuestionPanel.type}
            key={QuestionPanel.id}
            extra={
              <DeleteButton
              title={`确认移除整个组吗，这将移除里面全部${QuestionPanel.type}`}
              confirm={( (listType: string): AnyFn => () => {
                dispatch({ type: 'removeQuestionList', listType })
                dispatch({ type: 'changeIsExists', isExists: false, listType })
                })(QuestionPanel.type)}
                />
              }
              >
            {QuestionPanel.questiton.map((questionItem) => (
              <QuestionItemWrapper key={questionItem.id}>
                <Button
                  type="link"
                  style={{ color: 'black', width: "50%"}}
                  onClick={() => {
                  dispatch({ type: '更新当前编辑的题目', questionItem })
                }}>
                  {questionItem.item_key}
                </Button>
                <span>{`分`}</span>
                {/* 删除按钮 */}
                <DeleteButton
                  confirm={() => removeQuesItem(questionItem, QuestionPanel)}
                  title="从试卷中移除这道题目？如果题目来源于题库，这并不会删除题目"
                />
              </QuestionItemWrapper>
            ))}
            </Panel> : <div key={QuestionPanel.id}></div>
          )}
        </Collapse>
      </CreateExamNavWrapper>
    </>
  )
}



const DeleteButton: React.FC<{
  confirm: AnyFn
  title: string
}> = ({confirm, title}) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={(e)=>{
        e?.stopPropagation()
        confirm()
      }}
      okText="是"
      cancelText="否"
    >
      <DeleteOutlined
        style={{
          color: 'grey',
          fontSize: '24px',
          float: 'right',
        }}
      />
    </Popconfirm>
  )
}
