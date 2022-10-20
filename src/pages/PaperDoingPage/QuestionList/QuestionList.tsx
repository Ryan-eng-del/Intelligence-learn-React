import { render } from "@testing-library/react";
import { uniqueId } from "lodash";
import React from "react"
import { QuestionListItem } from "../QuestionListItem/QuestionListItem"
import { Button } from "antd";

export interface dataTypeOfQuestionOfPaperVosType{
  paperId:string
  paperName:string
  questionOfPaperVos:questionOfPaperVosType[]
}

export interface questionOfPaperVosType {
  questionId?: string
  questionDescription: string
  questionType: number
  questionScore: number
  questionDifficulty: number
  questionOrder: number
  questionOption:string
}

export const QuestionList: React.FC<{ Questionlist: questionOfPaperVosType[] }> = (props) => {
  const questions = props.Questionlist;
  console.log(questions);

  return (
    <>
      <div >
        <form>
          {
            questions.map((data, index) => {
              return (
                <li key={data.questionId}>
                  <QuestionListItem key={data.questionId} data={data} index={index} />
                </li>
              )
            })
          }
          <div style={{ display: '-ms-flexbox', marginLeft: '35%', marginTop: 20 }}>
            <Button type="primary" htmlType={'submit'}>保存修改</Button>
            <Button type="primary" ghost htmlType={'submit'} style={{ marginLeft: 30 }}>提交</Button>
          </div>
        </form>
      </div>
    </>
  )
}