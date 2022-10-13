import React from "react"

let i: number
let j: number


const theA=(num1:number)=>{
  const s = '#item'+num1
    return(<a href={s}>{`${i}`}</a>)
}

export const Menu: React.FC<{ num: number }> = (parm) => {
  i=0
  j=parm.num
  const temp=[]
  while(j!=0){
    temp.push(i)
    i++
    j--
  }

  return (
  <>
    {
      temp.map((item,key)=>{
        return(<>
        <a href={`#item${item}`}>{`${item+1}`}</a>
        </>)
      })
    }
    <div></div>
  </>)
}