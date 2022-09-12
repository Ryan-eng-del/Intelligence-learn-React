import React, { useState } from 'react'
import { FolderTwoTone, FileTwoTone, EditTwoTone } from '@ant-design/icons'

type selfProps = {
  key: string
  id: string
  name: string
  size: string
  time: string
  isFolder: boolean
  deleteItem: (id: string) => void
  reName: (id: string, newName: string) => void
}

export const ResourceListItem: React.FC<selfProps> = (props) => {
  const { id, name, size, time, isFolder, deleteItem, reName } = props

  const [isHide, setIsHide] = useState(true)
  const [isReName, setIsReName] = useState(false)

  const handleMouseEnter = (e: any) => {
    e.target.style.background = '#F2F4F7'
    setIsHide(false)
  }

  const handleMouseLeave = (e: any) => {
    e.target.style.background = 'white'
    setIsHide(true)
  }

  const handleRename = () => {
    setIsReName(true)
  }

  const handleRenameDone = (e: any) => {
    if (e.code == 'Enter') {
      reName(id, e.target.value)
      setIsReName(false)
    }
  }

  return (
    <div
      style={{
        color: 'black',
        padding: 10,
        background: 'white',
        border: '1p',
        display: 'flex'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          width: 40
        }}
      >
        {isFolder ? <FolderTwoTone /> : <FileTwoTone />}
      </div>
      <div
        style={{
          width: 400,
          position: 'absolute',
          marginLeft: 40
        }}
      >
        {isReName ? (
          <input defaultValue={name} onKeyUp={handleRenameDone} />
        ) : (
          <span>
            {name}
            <EditTwoTone hidden={isHide} onClick={handleRename} />
          </span>
        )}
      </div>
      <div
        style={{
          width: 50,
          position: 'absolute',
          marginLeft: 450,
          font: 'small-caption',
          color: '#1890ff'
        }}
        hidden={isHide}
      >
        预览
      </div>
      <div
        style={{
          width: 50,
          position: 'absolute',
          marginLeft: 500,
          font: 'small-caption',
          color: '#1890ff'
        }}
        hidden={isHide}
      >
        下载
      </div>
      <div
        style={{
          width: 50,
          position: 'absolute',
          marginLeft: 550,
          font: 'small-caption',
          color: 'red'
        }}
        hidden={isHide}
        onClick={() => deleteItem(id)}
      >
        删除
      </div>
      <div
        style={{
          width: 50,
          position: 'absolute',
          marginLeft: 700
        }}
      >
        {size}
      </div>
      <div
        style={{
          width: 150,
          position: 'absolute',
          marginLeft: 900
        }}
      >
        {time}
      </div>
    </div>
  )
}
