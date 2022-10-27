import { Space } from 'antd'
import React from 'react'
import { ItemWrapper, MenuWrapper } from './MenuStyle'

export const Menu: React.FC<{ num: number[] }> = ({ num }) => {
  const temp: Array<number[]> = [[], [], [], [], []]
  num.map((n, i) => {
    let j = n
    while (j != 0) {
      temp[i].unshift(j)
      j--
    }
  })
  console.log('导航栏重载')

  return (
    <MenuWrapper>
      {temp.map((t, index) => (
        <div key={index}>
          <hr />
          <Space wrap size={[16, 24]} style={{ maxWidth: '300px' }} key={index}>
            {t.map((item,indey) => (
              <div key={indey}>
                <a href={`#item${item}`}>
                  <ItemWrapper>{item}</ItemWrapper>
                </a>
              </div>
            ))}
          </Space>
        </div>
      ))}
    </MenuWrapper>
  )
}
