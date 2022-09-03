import { List, Space } from 'antd'
import React from 'react'
import { ResourceListItem } from './ResourceListItem'


export const ResourceList: React.FC<{
  resourceItems: {
    id: string
    name: string
    time: string
  }[]

}> = ({resourceItems}) => {

  return (
    <>
      <List
        size="large"
        header={
          <Space className='flex'>
            <span>文件</span>
            <span>创建时间</span>
            <span>    </span>
          </Space>
        }
        bordered
        dataSource={resourceItems}
        renderItem={i => <List.Item><ResourceListItem item={i}/></List.Item>}
      />
    </>
  )
}
