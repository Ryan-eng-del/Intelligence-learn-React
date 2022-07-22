import { Transfer } from 'antd'
import type { TransferDirection } from 'antd/es/transfer'
import React, { useState } from 'react'

export const AssociateKnowledgePoints = () => {
  interface RecordType {
    key: string
    title: string
    description: string
  }

  const mockData: RecordType[] = [
    { key: '1', title: '复合命题', description: 'd1' },
    { key: '2', title: '命题', description: 'd2' },
    { key: '3', title: '公式', description: 'd3' },
    { key: '4', title: '真值表', description: 'd4' },
    { key: '5', title: '命题公式类型', description: 'd5' },
    { key: '6', title: '集合表示法', description: 'd6' },
    { key: '7', title: '集合的运算', description: 'd7' },
    { key: '8', title: '集合算律', description: 'd8' },
    { key: '9', title: '集合等式的证明', description: 'd9' },
    { key: '10', title: '集合', description: 'd9' },
    { key: '11', title: '等式的证明', description: 'd9' },
    { key: '12', title: '重言式', description: 'd9' },
    { key: '13', title: '等值式', description: 'd9' }
  ]
  const initialTargetKeys = mockData
    .filter((item) => Number(item.key) > 10)
    .map((item) => item.key)
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log('targetKeys:', nextTargetKeys)
    console.log('direction:', direction)
    console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys)
    console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const onScroll = (
    direction: TransferDirection,
    e: React.SyntheticEvent<HTMLUListElement>
  ) => {
    console.log('direction:', direction)
    console.log('target:', e.target)
  }

  return (
    <Transfer
      oneWay
      dataSource={mockData}
      titles={['课时可关联的知识点', '课时已关联的知识点']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      operations={['关联']}
      render={(item) => item.title}
      selectAllLabels={Array.from({ length: 2 }).map(() => (count) => (
        <div>{count.totalCount}项知识点</div>
      ))}
    />
  )
}
