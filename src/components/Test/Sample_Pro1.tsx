import { Tag } from 'antd'

export default () => {
  return (
    <div
      style={{ lineHeight: '2rem', borderRadius: '10px', border: '1px solid #000', padding: '10px', margin: '10px' }}
    >
      <b>题目：</b>证明&nbsp;
      <Tag color="magenta">P→Q</Tag>
      <Tag color="cyan">⋀</Tag>
      <Tag color="magenta">P→R</Tag>
      <Tag color="#87d068">↔</Tag>
      <Tag color="magenta">
        P→
        <Tag color="magenta">Q⋀R</Tag>
      </Tag>
      <br />
      <b>解答（自动生成）：</b>
      <br />
      <Tag color="magenta">P→Q</Tag>
      <Tag color="cyan">⋀</Tag>
      <Tag color="magenta">P→R</Tag>
      <br />
      <Tag color="#87d068">↔</Tag>
      <Tag color="magenta">
        <Tag color="red">¬P</Tag>∨Q
      </Tag>
      <Tag color="cyan">⋀</Tag>
      <Tag color="magenta">
        <Tag color="red">¬P</Tag>∨R
      </Tag>
      <Tag color="#108ee9">蕴含等值式</Tag>
      <br />
      <Tag color="#87d068">↔</Tag>
      <Tag color="magenta">
        <Tag color="red">¬P</Tag>
      </Tag>
      <Tag color="cyan">∨</Tag>
      <Tag color="magenta">Q∧R</Tag>
      <Tag color="#108ee9">分配律</Tag>
      <br />
      <Tag color="#87d068">↔</Tag>
      <Tag color="magenta">
        P→
        <Tag color="magenta">Q⋀R</Tag>
      </Tag>
      <Tag color="#108ee9">蕴含等值式</Tag>
    </div>
  )
}
