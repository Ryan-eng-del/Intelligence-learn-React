import React from 'react'
import { 测试树 } from './测试树'
import { 测试树2 } from './测试树2'

export const StudentDiscussPage: React.FC = () => {
  const data = {
    name: '第一级',
    child: [
      {
        name: '第二级-1',
        child: [
          { name: '第三级-3', child: [] },
          { name: '第三级-4', child: [] }
        ]
      },
      {
        name: '第二级-2',
        child: [
          { name: '第三级-5', child: [] },
          { name: '第三级-6', child: [] }
        ]
      }
    ]
  }
  return (
    <>
      <div>对象形式传入</div>
      <测试树 data={data}></测试树>
      <div>数组形式传入</div>
      <测试树2 data={[data]}></测试树2>
    </>
  )
}
