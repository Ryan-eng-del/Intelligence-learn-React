import React from 'react'
import { Button } from 'antd'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'

export const QuestionList: React.FC<{ Questionlist: StudentPaperItem[] }> = (
  props
) => {
  const questions = props.Questionlist
  console.log(questions)
  type T = StudentPaperItem
  const setAns = () => console.log('change!')
  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} setAns={setAns} />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} setAns={setAns} />,
    [QuestionType.fillBlank]: (data: T) => (
      <P3 content={data} setAns={setAns} />
    ),
    [QuestionType.shortAnswer]: (data: T) => (
      <P4 content={data} setAns={setAns} />
    ),
    [QuestionType.judge]: (data: T) => <P5 content={data} setAns={setAns} />
  }
  return (
    <>
      <div>
        <form>
          {questions.map((data) => {
            return (
              <div
                key={data.questionId}
                style={{
                  margin: '20px',
                  border: '1px solid #000',
                  padding: '10px'
                }}
              >
                {mapper[data.questionType as QuestionType](data)}
              </div>
            )
          })}
          <div
            style={{ display: '-ms-flexbox', marginLeft: '35%', marginTop: 20 }}
          >
            <Button type="primary" htmlType={'submit'}>
              保存修改
            </Button>
            <Button
              type="primary"
              ghost
              htmlType={'submit'}
              style={{ marginLeft: 30 }}
            >
              提交
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
