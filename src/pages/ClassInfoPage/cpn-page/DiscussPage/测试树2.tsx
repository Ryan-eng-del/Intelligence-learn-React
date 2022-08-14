import { Button, Space } from 'antd'
import React, { useState } from 'react'

type Node = {
  name:string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child:Node[]
}

export const 测试树2: React.FC<{
  data:Node[]
}> = ({data}) => {
  const [dataList,setData] = useState(data)

  // 调试内容(仅做展示，运行会导致无限循环)
  // console.log(dataList===data); // ture
  // setData(dataList) //页面不会发生变化，react过滤的自赋值
  // setData([...dataList])  //页面发生变化，展开再重组的不是同一数组
  // console.log(dataList===data); // false

  const 变化 = (item:Node) => () => {
    item.name = item.name + "!"

    //注意以下两种设置方式有什么不同？
    // setData([...dataList])
    setData([...data])
    // data 一直是父组件数据的引用！
    // dataList 在一次数据更新之后便不是了
    // dataList 只作为页面展示用，直接data.map的话页面并不会刷新
  }
  return (
    <>
      {
        dataList.map(item=>(
          <>
            <Space key={item.name}>
              <div>{item.name}</div>
              <Button onClick={变化(item)}>变换</Button>
            </Space>
            <div style={{ marginLeft:"40px" }}>
              <测试树2 data={item.child} />
            </div>
          </>
        ))
      }
    </>
  )
}
