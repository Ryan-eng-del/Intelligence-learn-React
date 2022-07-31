import React, { useState } from 'react'

import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'

const onSearch = (value: string) => console.log(value)
const { Search } = Input

type selfProps = {
  addDataFoder: () => void
}

export const Header: React.FC<selfProps> = (props) => {
  const { addDataFoder } = props
  return (
    <div
      style={{
        backgroundColor: 'white'
      }}
    >
      <div
        style={{
          display: 'flex',
          marginBottom: 5
        }}
      >
        <button
          style={{
            marginLeft: 10,
            marginTop: 15,
            backgroundColor: '#1890ff',
            color: 'white',
            borderRadius: '75px',
            border: 1
          }}
        >
          <span>
            <VerticalAlignTopOutlined />
            上传文件
          </span>
        </button>
        <button
          style={{
            marginLeft: 5,
            marginTop: 15,
            backgroundColor: 'white',
            color: '#1890ff',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '75px',
            borderColor: '#1890ff'
          }}
          onClick={addDataFoder}
        >
          新建文件夹
        </button>
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              // width: 200,
              marginTop: 10,
              marginLeft: '300%'
            }}
          />
        </Space>
      </div>
    </div>
  )
}
