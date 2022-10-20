import React from "react"
import { questionOfPaperVosType } from "../QuestionList/QuestionList"





export const QuestionListItem: React.FC<{ data: questionOfPaperVosType, index: number }> = (props) => {
  const data = props.data
  // if (data.questionType == 0) {
  //   options = data.questionOption.split("<>");
  // }

  return (
    <>
      <div style={{ display: 'flex', textAlign: 'left', paddingTop: 10 }} id={`item${data.questionOrder}`}>
        <div style={{ flexDirection: 'column', flex: '2' }}>
          <div style={{ wordWrap: 'break-word', width: 800 }}>
            {data.questionDescription}
          </div>
          {
            // 我也不知道01234分别是什么题!!
            // 单选题
            data.questionType == 0 && (
              data.questionOption.split("<>").map((data, index) =>
                <>
                  {/* 在这里应该是试卷表单的input,但目前用p挂一下 */}
                  <p key={index}>{data}</p>
                </>
              )
            )
            ||
            // 多选题
            data.questionType == 1 && (
              data.questionOption.split("<>").map((data, index) =>
                <>
                  {/* 在这里应该是试卷表单的input */}
                  <p key={index}>{data}</p>
                </>
              )
            )
            ||
            // 填空题
            data.questionType == 2 && (
              // 填空题不知道怎么传过来
              <>
              </>

              // data.questionOption.split("<>").map((data,index)=>
              //   <>
              //   {/* 在这里应该是试卷表单的input */}
              //   <p key={index}>{data}</p>
              //   </>
              // )
            )
            ||
            // 简答题
            data.questionType == 3 &&
            <input />
            ||
            // 判断题
            data.questionType == 4 &&
            data.questionOption.split("<>").map((data, index) =>
              <>
                <p key={index}>{data}</p>
              </>
            )
          }
        </div>
        <div style={{ flex: '1' }}>
          {data.questionScore}分
        </div>
      </div>
    </>
  )
}