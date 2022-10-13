import React from "react"





export interface questiontype{
  questionName: string,
  answerA: string,
  answerB: string,
  answerC: string,
  answerD: string,
  score?:number
}

export const QuestionListItem: React.FC<{data:questiontype,index:number}> = (parm) => {
  return (
    <div style={{ display: 'flex',textAlign:'left',paddingTop:10}} id={`item${parm.index.toString()}`}>
      <div style={{flexDirection:'column',flex:'2'}}>
        <div style={{wordWrap:'break-word',width:800}}>
          {parm.data.questionName}
        </div>
        <ul style={{paddingLeft:'0',listStyle:'none'}}>
          <li>
          <input type={'radio'} name={`${parm.index}`}/>
          {parm.data.answerA}
          </li>
          <li>
          <input type={'radio'} name={`${parm.index}`}/>
          {parm.data.answerB}
          </li>
          <li>
          <input type={'radio'} name={`${parm.index}`}/>
          {parm.data.answerC}
          </li>
          <li>
          <input type={'radio'} name={`${parm.index}`}/>
          {parm.data.answerD}
          </li>
        </ul>
      </div>
      <div style={{flex:'1'}}>
        {parm.data.score}分
      </div>
    </div>
  )
}