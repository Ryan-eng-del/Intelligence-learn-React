import { render } from "@testing-library/react";
import { uniqueId } from "lodash";
import React from "react"
import { QuestionListItem, questiontype } from "../QuestionListItem/QuestionListItem"
import { Button } from "antd";

export const QuestionList: React.FC<{Questionlist:questiontype[]}> = (parm) => {
  const qusetions = parm.Questionlist;
  return (
    <>
      <div >
        <form>
          <ol style={{ paddingLeft:'10%'}}>
            {
              qusetions.map((data: questiontype, index) => {
                return (
                  <li key={uniqueId()}>
                    <QuestionListItem data={data} index={index}/>
                  </li>
                )
              })
            }
          </ol>
          <div style={{display:'-ms-flexbox',marginLeft:'35%',marginTop:20}}>
            <Button type="primary" htmlType={'submit'}>保存修改</Button>
            <Button type="primary" ghost htmlType={'submit'} style={{marginLeft:30}}>提交</Button>
          </div>
        </form>
      </div>
    </>
  )
}