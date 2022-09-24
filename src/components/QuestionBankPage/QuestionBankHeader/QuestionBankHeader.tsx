import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Radio, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QuestionType } from '../../../server/fetchExam/types/index'
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
          className="search"
        />
        <Button
          type="primary"
          style={{ float: 'right' }}
          onClick={() => {
            navigate('/classinfo', { replace: true })
          }}
        >
          返回
        </Button>
        {/* 添加题目 */}
        <Tooltip title="添加题目" placement="bottom">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined className="addicon" />}
            size="large"
            className="aqbtn"
            onClick={() => navigate('/createquestion', { replace: true })}
          />
        </Tooltip>

        {/* 题型、知识点管理 */}
        <SelectiveList>
          <div>
            <span className="introduce">题目类型:</span>
            <Radio.Group
              onChange={() => {
                console.log(1)
              }}
              defaultValue="all"
            >
              <Button type="primary" value="all" className="choosebtn">
                所有
              </Button>
              {questionType.map((item, index) => (
                <Button
                  key={index}
                  value={item.type}
                  className="choosebtn"
                  type="primary"
                >
                  {item.title}
                </Button>
              ))}
            </Radio.Group>
          </div>

          <KnowledgePoint>
            <span className="introduce">知识点：</span>
            <Button type="dashed" className="choosebtn">
              点击选择知识点
            </Button>
            {/* 弹出模态框 */}
          </KnowledgePoint>
        </SelectiveList>
      </QuestionBankHeaderWrapper>
    </>
  )
}
