import React, { useState } from 'react'
import {
  FileUnknownOutlined,
  FileImageOutlined,
  PlaySquareOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined
} from '@ant-design/icons'
import { last } from 'lodash'
import { Button, Space, Modal, Input, Popconfirm, message } from 'antd'
import { ResourceType } from 'server/fetchCourseResource/types'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'

export const ResourceListItem: React.FC<{
  item: ResourceType
  rename: (newName: string) => void
  deleteFile: () => void
  premission: boolean
}> = ({ item, rename, deleteFile, premission }) => {
  const [hover, setHover] = useState(false)
  const [newName, setNewName] = useState(item.resourceName)

  const fileType = last(item.resourceName?.split('.'))
  const icon =
    fileType === undefined ? (
      <FileUnknownOutlined />
    ) : ['png', 'jpg'].includes(fileType) ? (
      <FileImageOutlined />
    ) : ['mp4'].includes(fileType) ? (
      <PlaySquareOutlined />
    ) : ['xla', 'xlsx'].includes(fileType) ? (
      <FileExcelOutlined />
    ) : ['ppt', 'pptx'].includes(fileType) ? (
      <FilePptOutlined />
    ) : ['pdf'].includes(fileType) ? (
      <FilePdfOutlined />
    ) : ['doc', 'docx'].includes(fileType) ? (
      <FileWordOutlined />
    ) : (
      <FileUnknownOutlined />
    )

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => {
    // 发送修改信息的请求
    rename(newName)
    setIsModalVisible(false)
  }

  const handleDelete = () => {
    setIsModalVisible(false)
    deleteFile()
  }

  return (
    <>
      {/* 编辑弹窗 */}
      <Modal
        title={`修改文件信息-${item.resourceName}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Popconfirm
            key="delete"
            title="你确定要删除这个文件吗"
            onConfirm={handleDelete}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>
              删除这个文件
            </Button>
          </Popconfirm>,
          <Button key="save" type="primary" onClick={handleOk}>
            保存
          </Button>
        ]}
      >
        <label>修改文件名</label>
        <Input
          onChange={({ target }) => setNewName(target.value)}
          value={newName}
        ></Input>
        <label>修改关联的知识点</label>
        <KnowledgeSeletor></KnowledgeSeletor>
      </Modal>

      <div
        className="flex"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* 文件名及图标 */}
        <Space style={{ width: '20vw' }}>
          <div style={{ fontSize: '30px' }}>{icon}</div>
          <div>{item.resourceName}</div>
        </Space>

        {/* 创建时间 */}
        <div>{item.createTime}</div>

        {/* 操作区域 */}
        <Space
          size="middle"
          style={{ visibility: hover ? 'visible' : 'hidden' }}
        >
          <Button type="primary" icon={<EyeOutlined />}>
            预览
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>
          {premission ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              编辑
            </Button>
          ) : (
            <></>
          )}
        </Space>
      </div>
    </>
  )
}
