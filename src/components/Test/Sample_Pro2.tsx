import { Tag } from 'antd'

export const Sample_Pro2 = () => {
  return (
    <div
      style={{ lineHeight: '2rem', borderRadius: '10px', border: '1px solid #000', padding: '10px', margin: '10px' }}
    >
      <b>题目：</b>列出真值表&nbsp;
      <Tag color="magenta">
        P→
        <Tag color="red">Q∧R</Tag>
      </Tag>
      <br />
      <b>解答（自动生成）：</b>
      <br />
      <table style={{ lineHeight: '1rem' }}>
        <thead>
          <tr>
            <th>
              <Tag color="magenta">P</Tag>
            </th>
            <th>
              <Tag color="magenta">Q</Tag>
            </th>
            <th>
              <Tag color="magenta">R</Tag>
            </th>
            <th>
              <Tag color="magenta">
                P→
                <Tag color="red">Q∧R</Tag>
              </Tag>
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 0, 1],
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 1]
          ].map((line, index) => (
            <tr key={index}>
              {line.map((i, jndex) => (
                <th key={jndex}>
                  <Tag color={i ? '#87d068' : '#f50'}>{i}</Tag>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
