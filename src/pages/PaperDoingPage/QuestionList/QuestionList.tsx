import React, { useState } from 'react'
import { Button } from 'antd'
import { QuestionType, StudentPaperItem } from 'server/fetchExam/types'
import { Take as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { Take as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { Take as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { useSubmitTestPaper } from 'server/fetchExam/TestPaper'

export const QuestionList: React.FC<{ Questionlist: StudentPaperItem[] }> = (
  props
) => {
  const questions = props.Questionlist
  type T = StudentPaperItem

  // 这是没有必要的，setAns数据不返回到页面
  const [ansSet,setAnsSet] = useState(questions.map(i=>({questionId:i.questionId,studentAnswer:''})))
  const setAns = (id:string,ans:string) => {
    ansSet.filter(i=>i.questionId==id)[0].studentAnswer = ans;
    setAnsSet([...ansSet])
  }
  const { mutate } = useSubmitTestPaper()
  const submit = () => {
    mutate(ansSet)
  }

  const mapper = {
    [QuestionType.single]: (data: T) => <P1 content={data} setAns={ans=>setAns(data.questionId!,ans)} />,
    [QuestionType.multiple]: (data: T) => <P2 content={data} setAns={ans=>setAns(data.questionId!,ans)} />,
    [QuestionType.fillBlank]: (data: T) => (
      <P3 content={data} setAns={ans=>setAns(data.questionId!,ans)} />
    ),
    [QuestionType.shortAnswer]: (data: T) => (
      <P4 content={data} setAns={ans=>setAns(data.questionId!,ans)} />
    ),
    [QuestionType.judge]: (data: T) => <P5 content={data} setAns={ans=>setAns(data.questionId!,ans)} />
  }
  return (
    <>
      <div>
        <form>
          {questions.map((data,i) => {
            console.log(`item${data.questionType}${i}`);

            return (
              <div
                key={data.questionId}
                style={{
                  margin: '20px',
                  border: '1px solid #000',
                  padding: '10px'
                }}
                id={`item${data.questionType}${i}`}
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
              onClick={submit}
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
