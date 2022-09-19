import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Radio, Tooltip } from 'antd'
import { QuestionType } from 'publicComponents/CreateQuestionPage/config/type'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  QuestionBankHeaderWrapper,
  SelectiveList,
  KnowledgePoint
} from '../QuestionBankHeader/QuestionBankHeaderStyle'
export const QuestionBankHeader: React.FC = () => {
  const navigate = useNavigate()
  const questionType = [
    {
      title: '单选题',
      type: QuestionType.single
    },
    {
      title: '多选题',
      type: QuestionType.multiple
    },
    { title: '填空题', type: QuestionType.fillBlank },
    { title: '简答题', type: QuestionType.shortAnswer },
    { title: '编程题', type: QuestionType.programming },
    { title: '判断题', type: QuestionType.judge }
  ]
  return (
    <>
      <QuestionBankHeaderWrapper>
        {/* 搜索题目 */}
        <Input.Search
          allowClear
          size="large"
          onSearch={(value) => {
            console.log('输入框', value)
          }}
          style={{ marginLeft: '30px', marginTop: '10px', width: '340px' }}
        />
        {/* 添加题目 */}
        <Tooltip title="添加题目" placement="bottom">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ fontSize: '50px' }} />}
            size="large"
            style={{
              width: '110px',
              height: '110px',
              float: 'right',
              marginTop: '60px',
              marginRight: '70px'
            }}
            onClick={() => navigate('/createquestion')}
          />
        </Tooltip>

        {/* 题型、知识点管理 */}
        <SelectiveList>
          <div>
            <span style={{ fontSize: '19px' }}>题目类型:</span>
            <Radio.Group
              onChange={() => {
                console.log(1)
              }}
              defaultValue="all"
            >
              <Radio.Button
                value="all"
                style={{
                  marginLeft: '25px',
                  border: '1px dashed #d9d9d9'
                  // boxShadow: '5px 5px 30px -7px rgba(0, 0, 0, .3)'
                }}
              >
                所有
              </Radio.Button>
              {questionType.map((item, index) => (
                <Radio.Button
                  key={index}
                  value={item.type}
                  style={{
                    marginLeft: '25px',
                    border: '1px dashed #d9d9d9'
                  }}
                >
                  {item.title}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <KnowledgePoint>
            <span style={{ fontSize: '19px' }}>知识点：</span>
            <Button
              type="dashed"
              style={{
                marginLeft: '25px'
              }}
            >
              点击添加知识点
            </Button>
            {/* 弹出模态框 */}
          </KnowledgePoint>
        </SelectiveList>
      </QuestionBankHeaderWrapper>
    </>
  )
}
