import React, { ReactElement, useRef, useState } from 'react'
import {
  Button,
  Drawer,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadFile
} from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'
import { KnowledgeSeletor } from '../../../../../../publicComponents/ResourcePage'
import styled from 'styled-components'
import { RcFile } from 'antd/lib/upload'

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
  const ref = useRef<any>()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const handleChange = (value: string) => {
    setUploadType(value)
  }
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file as RcFile)
    })
    setUploading(true)
    // You can use any AJAX library you like
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([])
        message.success('upload successfully.')
      })
      .catch(() => {
        message.error('upload failed.')
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const props: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

      return false
    },

    fileList
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <ChapterTreeModalWrapper className={'modal-wrapper'}>
      <Modal
        title="添加课时"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ height: '400px' }}
      >
        <label htmlFor={'addResource'}>课时名称</label>
        <Input
          placeholder={'请输入课时名称'}
          id={'addResource'}
          defaultValue={resourceTitle}
          onChange={(e) => {
            setResourceTitle(e.target.value)
          }}
          style={{ position: 'relative', zIndex: '4' }}
        />
        <div
          style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="primary"
            onClick={showDrawer}
            style={{ position: 'relative', zIndex: '4' }}
          >
            添加资源并且关联知识点
          </Button>
        </div>
        <DrawerWrapper ref={ref}>
          <Drawer
            title="添加资源并且关联知识点"
            placement="top"
            closable={true}
            onClose={onClose}
            visible={open}
            mask={false}
            width={'520'}
            getContainer={ref.current}
            style={{ position: 'absolute' }}
          >
            <>
              <UploadWrapper>
                <Upload {...props} className={'upload'}>
                  <Button icon={<UploadOutlined />}>
                    请选择文件，支持多个文件上传
                  </Button>
                </Upload>
              </UploadWrapper>

              <RelatePointsWrapper>
                <label>关联知识点</label>
                <KnowledgeSeletor />
              </RelatePointsWrapper>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  onClick={handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  {fileList.length === 0 ? '请先上传视频' : '点击上传'}
                </Button>
              </div>
            </>
          </Drawer>
        </DrawerWrapper>
        <div>已经上传的资源</div>
      </Modal>
    </ChapterTreeModalWrapper>
  )
}
export const ChapterTreeModalWrapper = styled.div`
  position: relative;
`
export const DrawerWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 520px;
  height: 400px;
  .drawer-test {
    width: 520px;
    z-index: 5;
  }
`
export const UploadWrapper = styled.div`
  margin-bottom: 13px;
  display: flex;
  flex-flow: column nowrap;
`
export const RelatePointsWrapper = styled.div`
  margin-top: 20px;
`
