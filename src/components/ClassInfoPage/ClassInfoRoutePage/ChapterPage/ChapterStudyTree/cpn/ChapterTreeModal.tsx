import React, { useState } from 'react'
import { Button, Input, message, Modal, Select, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'
import { KnowledgeSeletor } from '../../../../../../publicComponents/ResourcePage'

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
  setResourceObj: any
}> = ({
  isModalVisible,
  setIsModalVisible,
  handleOk,
  resourceTitle,
  setResourceTitle,
  uploadType,
  setUploadType,
  setResourceObj
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
        // const obj = {
        //   resourceId: Math.random() * 10000,
        //   type: '10',
        //   resourceName: info.file.name,
        //   resourceLink: ''
        // }
        // console.log(obj)

        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        const obj = {
          resourceId: Math.random() * 10000,
          type: '10',
          resourceName: info.file.name,
          resourceLink: ''
        }
        console.log('fileObj', obj)
        setResourceObj((pre: any) => pre.concat(obj))
        message.error(`${info.file.name} file upload failed.`)
      }
      console.log(info)
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
        <label htmlFor={'addResource'}>课时名称</label>
        <Input
          placeholder={'请输入课时名称'}
          id={'addResource'}
          defaultValue={resourceTitle}
          onChange={(e) => {
            setResourceTitle(e.target.value)
          }}
        />
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
        <label style={{ marginBottom: '12px' }}>资源绑定知识点</label>
        <KnowledgeSeletor />
      </Modal>
    </>
  )
}
