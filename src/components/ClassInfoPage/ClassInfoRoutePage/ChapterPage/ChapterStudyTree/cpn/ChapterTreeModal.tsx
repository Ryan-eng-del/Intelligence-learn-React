import React, { useRef, useState } from 'react'
import { Button, Drawer, Input, List, message, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'
import styled from 'styled-components'
import { RcFile } from 'antd/lib/upload'
import { TreeSelected } from '../../../KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { useAddContentResource } from '../../../../../../server/fetchChapter'

export const ChapterTreeModal: React.FC<{
  isModalVisible: any
  setIsModalVisible: any
  resourceTitle: any
  setResourceTitle: any
  uploadType: any
  setUploadType: any
  setResourceObj: any
  checkTreeData: any
  curCheckId: any
  handleRelateCheck: any
  handleRelateExpand: any
  relateKeys: any
  curFileListName: any
  setCurFileListName: any
  fileList: any
  setFileList: any
  handleOk: any
}> = ({
  isModalVisible,
  setIsModalVisible,
  resourceTitle,
  setResourceTitle,
  checkTreeData,
  curCheckId,
  handleRelateCheck,
  handleRelateExpand,
  relateKeys,
  curFileListName,
  setCurFileListName,
  fileList,
  setFileList,
  handleOk
}) => {
  const ref = useRef<any>()
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { mutateAsync: addContentResource } = useAddContentResource()

  /* 处理上传 */
  const handleUpload = () => {
    //toDo 这里要注意，不能重复上传同一文件，如果上传了同一个，记得提醒用户。
    setOpen(false)
    const formData = new FormData()
    fileList.forEach((file: any) => {
      formData.append('files[]', file as RcFile)
      setCurFileListName((pre: any) => {
        /*标记是否已经添加过*/
        let flag = false
        /*标记是否是第一次上传*/
        let first = false
        if (pre.length == 0) {
          pre = pre.concat({ title: file.name })
          first = true
        } else
          pre.forEach((i: any) => {
            if (i.title == file.name) flag = true
          })
        if (!flag && !first) pre = pre.concat({ title: file.name })
        return pre
      })
    })
    setUploading(true)
    addContentResource({
      file: formData,
      related_points: curCheckId,
      course_id: '1'
    })
      .then(() => {
        message.success('文件上传成功')
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
      const name: string[] = []
      //toDo 这里之后，需要用Map来优化
      fileList.forEach((f: any) => {
        name.push(f.name + f.size)
      })
      if (name.includes(file.name + file.size)) {
        message.error('重复上传文件！')
      } else setFileList([...fileList, file])
      return false
    },
    fileList
  }

  return (
    <ChapterTreeModalWrapper className={'modal-wrapper'}>
      <Modal
        title="添加课时"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        style={{ height: '400px' }}
        className={'modal-chapter'}
      >
        <label htmlFor={'addResource'}>课时名称</label>
        <Input
          placeholder={'请输入课时名称'}
          id={'addResource'}
          value={resourceTitle}
          onChange={(e) => setResourceTitle(e.target.value)}
          style={{ position: 'relative', zIndex: '4' }}
        />
        <div
          style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="primary"
            onClick={() => setOpen(true)}
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
            onClose={() => setOpen(false)}
            visible={open}
            mask={false}
            width={'520'}
            getContainer={ref.current}
            style={{ position: 'absolute' }}
            height={'475.6'}
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
                <TreeSelected
                  checkTreeData={checkTreeData}
                  relateKeys={relateKeys}
                  handleRelateExpand={handleRelateExpand}
                  handleRelateCheck={handleRelateCheck}
                  curCheckId={curCheckId}
                />
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
        <div>
          <label>已经上传的资源:</label>
          <List
            itemLayout="horizontal"
            dataSource={curFileListName}
            renderItem={(item: any) => <List.Item>{item.title}</List.Item>}
          />
        </div>
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
  height: 475.6px;
`
export const UploadWrapper = styled.div`
  margin-bottom: 13px;
  display: flex;
  flex-flow: column nowrap;
`
export const RelatePointsWrapper = styled.div`
  margin-top: 20px;
`
