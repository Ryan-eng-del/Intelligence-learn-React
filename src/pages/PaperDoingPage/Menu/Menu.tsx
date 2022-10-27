import { Button, Divider, Space } from 'antd'
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
  console.log(temp);
  let indey1 = 0;
  let yiweixunhuan = 0

  return (
    <MenuWrapper>
      {temp.map((t, index) => (
        <div key={index}>
          <Divider orientation="left" orientationMargin="0">
            {
              ++yiweixunhuan == 1 ? (<span>单选题</span>) :
              yiweixunhuan == 2 ? (<span>多选题</span>) :
              yiweixunhuan == 3 ? (<span>填空题</span>) :
              yiweixunhuan == 4 ? (<span>简答题</span>) :
              (<span>判断题</span>)
            }
          </Divider>
          <Space wrap size={[0, 0]} style={{ maxWidth: '300px', border: 'border: 1px solid #000' }} key={index}>
            {t.map((item, indey) => (
              <div key={indey}>
                <a href={`#item${index}${indey1++}`}>
                  <ItemWrapper>
                    <Button type="primary" shape="circle">
                      {item}
                    </Button>
                  </ItemWrapper>
                </a>
              </div>
            ))}
          </Space>
        </div>
      ))}
    </MenuWrapper>
  )
}
