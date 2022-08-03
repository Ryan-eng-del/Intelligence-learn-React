import React, { useRef } from 'react'
import { CreateExamNavWrapper, QuestionItemWrapper } from './CreateExamNavStyle'
import { Collapse, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { QuestionItem, QuestionList } from 'pages/CreateExamPage/config/type'
import items from 'components/HomePage/HomeNav/config'
import { useNavigate } from 'react-router-dom'
const { Panel } = Collapse
export const CreateExamNav: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const { questionList, dispatch } = props;
  const genExtra = (listType: string) => (
    <DeleteOutlined
      style={{ color: 'grey', fontSize: '13px' }}
      onClick={() => {
        dispatch({ type: 'removeQuestionList', listType });
        dispatch({ type: 'changeIsExists', isExists: false, listType });
      }}
    />
  )
  const removeQuesItem = (curItem: QuestionItem, curList: QuestionList) => {
    if (curList.amount === 0) {
      dispatch({
        type: 'changeIsExists',
        isExists: false,
        listType: curList.type
      });
    }
    dispatch({
      type: 'removeQuestionItem',
      listType: curList.type,
      key: curItem.item_key,
      id: curItem.id
    });
    dispatch({ type: 'rearrangeItem' });
  }
  return (
    <>
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
                    <QuestionItemWrapper key={item_two.id} onClick={()=>navigate(item_one.type)}>
                      <Button type="link" style={{ color: 'black' }} >
                        {item_two.item_key}
                      </Button>
                      {/* 删除按钮 */}
                      <Popconfirm title="确认要删除吗"
                        onConfirm={()=>removeQuesItem(item_two, item_one)}
                        okText="是"
                        cancelText="否"
                      >
                          <DeleteOutlined
                            style={{ color: 'grey', fontSize: '18px',float: 'right' }}
                          />
                      </Popconfirm>
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
