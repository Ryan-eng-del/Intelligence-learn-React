import React, { useState } from 'react'
import { Button, Input, List, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { useHandleUploadClassTimeResource } from 'hook/useChapterStudy/useHandleUploadClassTimeResource'
import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { uploadProps } from 'hook/useChapterStudy/config'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'

export const ChapterTreeModal: React.FC<{
  checkTreeData: any
  handleRelateCheck: any
  relateKeys: any
  handleRelateExpand: any
  handleOk: any
}> = ({ checkTreeData, handleRelateExpand, handleOk, relateKeys }) => {
  const [fileList, setFileList] = useState<any>([])

  /*ClassTime Reducer*/
  const { dispatch, classTimeState } = useClassTimeDispatch()
  /*上传资源，关联知识点*/
  const { handleUpload, uploading, setOpenResourceDrawer, openResourceDrawer, relatePoints, handleRelateCheck } =
    useHandleUploadClassTimeResource({
      dispatch,
      fileList
    })
  /*Upload Props*/
  const props = uploadProps(fileList, setFileList)

  return (
    <ChapterTreeModalWrapper className={'modal-wrapper'}>
      <Modal
        title="添加课时"
        visible={classTimeState.courseTimeModalVisible}
        onOk={handleOk}
        onCancel={() => dispatch({ type: 'setModalState', open: false })}
        style={{ height: '400px' }}
        className={'modal-chapter'}
      >
        <label htmlFor={'addResource'}>课时名称</label>
        <Input
          placeholder={'请输入课时名称'}
          id={'addResource'}
          value={classTimeState.courseTimeName}
          onChange={(e) => dispatch({ type: 'setName', name: e.target.value })}
        />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              setOpenResourceDrawer(true)
              dispatch({ type: 'setModalState', open: false })
            }}
          >
            添加课时资源
          </Button>
        </div>

        <div>
          <GlobalLabel>已经上传的资源:</GlobalLabel>
          <List
            itemLayout="horizontal"
            dataSource={classTimeState.fileList}
            renderItem={(item: any) => <List.Item>{item.resourceName}</List.Item>}
          />
        </div>
      </Modal>
      <Modal
        title="添加资源并且关联知识点"
        visible={openResourceDrawer}
        mask={false}
        onOk={handleOk}
        onCancel={() => {
          setOpenResourceDrawer(false)
          dispatch({ type: 'setModalState', open: true })
        }}
        style={{ height: '400px' }}
      >
        <>
          <UploadWrapper>
            <Upload {...props} className={'upload'}>
              <Button icon={<UploadOutlined />}>请选择文件，一次性上传一个文件</Button>
            </Upload>
          </UploadWrapper>

          <RelatePointsWrapper>
            <GlobalLabel>关联知识点</GlobalLabel>
            <TreeSelected
              checkTreeData={checkTreeData}
              relateKeys={relateKeys}
              handleRelateExpand={handleRelateExpand}
              handleRelateCheck={handleRelateCheck}
              curCheckId={relatePoints}
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
  height: 500px;
`
export const UploadWrapper = styled.div`
  margin-bottom: 13px;
  display: flex;
  flex-flow: column nowrap;
`
export const RelatePointsWrapper = styled.div`
  margin-top: 20px;
  max-height: 200px;
  overflow: scroll;
`
