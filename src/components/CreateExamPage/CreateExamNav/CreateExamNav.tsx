import React, { useRef } from 'react'
import { CreateExamNavWrapper, QuestionItemWrapper } from './CreateExamNavStyle'
import { Collapse, Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { QuestionItem, QuestionList } from 'pages/CreateExamPage/config/type'
import items from 'components/HomePage/HomeNav/config'
const { Panel } = Collapse
export const CreateExamNav: React.FC<any> = (props) => {
  const { questionList, dispatch } = props
  const genExtra = (listType: string) => (
    <DeleteOutlined
      style={{ color: 'grey', fontSize: '13px' }}
      onClick={() => {
        dispatch({ type: 'removeQuestionList', listType })
        dispatch({ type: 'changeIsExists', isExists: false, listType })
      }}
    />
  )
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
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        您确定要
      </Modal> */}
      <CreateExamNavWrapper>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solied rgb(238, 237, 237)',
            width: '85%',
            margin: '10px auto'
          }}
          defaultActiveKey={questionList.map((item: QuestionItem) => item.id)}
        >
          {questionList.map((item_one: any) => {
            if (item_one.isExists) {
              return (
                <Panel
                  header={item_one.type}
                  key={item_one.id}
                  extra={genExtra(item_one.type)}
                >
                  {item_one.children.map((item_two: any) => (
                    <QuestionItemWrapper key={item_two.id}>
                      <Button type="link" style={{ color: 'black' }}>
                        {item_two.item_key}
                      </Button>
                      {/* 删除按钮 */}
                      <Button
                        type="link"
                        style={{ float: 'right' }}
                        onClick={() => {
                          removeQuesItem(item_two, item_one)
                        }}
                      >
                        <DeleteOutlined
                          style={{ color: 'grey', fontSize: '12px' }}
                        />
                      </Button>
                    </QuestionItemWrapper>
                  ))}
                </Panel>
              )
            }
          })}
        </Collapse>
      </CreateExamNavWrapper>
    </>
  )
}
