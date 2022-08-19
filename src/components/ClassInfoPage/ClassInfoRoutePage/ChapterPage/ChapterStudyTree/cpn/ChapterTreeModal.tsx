import React, { useState } from 'react'
import { Button, Input, message, Modal, Select, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'

const { Dragger } = Upload
const { Option } = Select
export const ChapterTreeModal: React.FC<{
  isModalVisible: any
  setIsModalVisible: any
  handleOk: any
  resourceTitle: any
  setResourceTitle: any
  uploadType: any
  setUploadType: any
}> = ({
  isModalVisible,
  setIsModalVisible,
  handleOk,
  resourceTitle,
  setResourceTitle,
  uploadType,
  setUploadType
}) => {
  const handleChange = (value: string) => {
    setUploadType(value)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  return (
    <>
      <Modal
        title="添加资源"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor={'addResource'}>请输入资源标题</label>
        <Input
          placeholder={'请输入资源标题'}
          id={'addResource'}
          defaultValue={resourceTitle}
          onChange={(e) => {
            setResourceTitle(e.target.value)
          }}
        />
        <label>请选择资源类型</label>
        <div></div>
        <Select
          defaultValue="视频"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="视频">视频</Option>
          <Option value="课件">课件</Option>
          <Option value="作业">作业</Option>
        </Select>
        {uploadType === '视频' || uploadType === '课件' ? (
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">上传{uploadType}</p>
            <p className="ant-upload-hint">点击或者拖拽到该区域进行</p>
          </Dragger>
        ) : (
          <div>
            <Button type={'primary'}>从作业库当中上传作业</Button>
          </div>
        )}
      </Modal>
    </>
  )
}
