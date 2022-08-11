import { Header } from './Header'
import { ResourceList } from './ResourceList'
import moment from 'moment'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'

export const ResourcePage: React.FC = () => {
  const [resourceItems, setResourceItems] = useState([
    {
      id: '0',
      name: '文件名PNG',
      size: '17.0KB',
      time: '07-20 00:35',
      isFolder: false
    },
    {
      id: '1',
      icon: '图标',
      name: '文件NP4',
      size: '--',
      time: '07-20 00:35',
      isFolder: false
    },
    {
      id: '2',
      icon: '图标',
      name: '文件名ppt',
      size: '18.0MB',
      time: '07-20 00:35',
      isFolder: false
    }
  ])

  const addDataFoder = () => {
    const foder = {
      id: nanoid(),
      name: '新文件夹',
      size: '--',
      time: moment().format('MM-DD HH:mm'),
      isFolder: true
    }
    setResourceItems([foder, ...resourceItems])
  }

  const deleteItem = (id: string) => {
    const newItems = resourceItems.filter((item) => {
      return item.id !== id
    })

    setResourceItems([...newItems])
  }

  const reName = (id: string, newName: string) => {
    console.log(id, newName)
    setResourceItems(
      resourceItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    )
    console.log(resourceItems)
  }

  return (
    <div
      style={{
        background: 'white'
      }}
    >
      <Header addDataFoder={addDataFoder} />
      <ResourceList
        resourceItems={resourceItems}
        deleteItem={deleteItem}
        reName={reName}
      />
      {/* <Text></Text> */}
    </div>
  )
}

export default ResourcePage
