import { Button, Space } from 'antd'
import React, { useState } from 'react'

type Node = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child: Node[]
}

export const 测试树: React.FC<{
  data: Node
}> = ({ data }) => {
  const [dataList, setData] = useState(data)
  const 变化 = () => {
    dataList.name = dataList.name + '!'
    setData({ ...dataList })
  }
  return (
    <>
      <Space>
        <div>{dataList.name}</div>
        <Button onClick={变化}>变换</Button>
      </Space>
      <div style={{ marginLeft: '40px' }}>
        {dataList.child.map((i) => (
          <测试树 data={i} key={i.name} />
        ))}
      </div>
    </>
  )
}
