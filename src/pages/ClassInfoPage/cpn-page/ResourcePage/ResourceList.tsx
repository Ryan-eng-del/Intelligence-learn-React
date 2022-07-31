import items from 'components/HomePage/HomeNav/config'
import React, { useState } from 'react'
import { ResourceListItem } from './ResourceListItem'

type selfProps = {
  resourceItems: {
    id: string
    name: string
    size: string
    time: string
    isFolder: boolean
  }[]
  deleteItem: (id: string) => void
  reName: (id: string, newName: string) => void
}

export const ResourceList: React.FC<selfProps> = (props) => {
  const { resourceItems, deleteItem, reName } = props

  return (
    <div
      style={{
        height: 570
      }}
    >
      <div
        style={{
          display: 'flex',
          background: '#F2F4F7',
          marginLeft: '1%',
          marginRight: '1%',
          height: 40,
          color: 'black'
        }}
      >
        <div
          style={{
            position: 'absolute',
            marginLeft: 50,
            fontWeight: 'bold',
            marginTop: 10
          }}
        >
          文件
        </div>
        <div
          style={{
            position: 'absolute',
            marginLeft: 725,
            fontWeight: 'bold',
            marginTop: 10
          }}
        >
          大小
        </div>
        <div
          style={{
            position: 'absolute',
            marginLeft: 925,
            fontWeight: 'bold',
            marginTop: 10
          }}
        >
          时间
        </div>
      </div>
      <div
        style={{
          padding: 10
        }}
      >
        {resourceItems.map((item) => {
          return (
            <ResourceListItem
              key={item.id}
              id={item.id}
              name={item.name}
              size={item.size}
              time={item.time}
              isFolder={item.isFolder}
              deleteItem={deleteItem}
              reName={reName}
            />
          )
        })}
      </div>
    </div>
  )
}
