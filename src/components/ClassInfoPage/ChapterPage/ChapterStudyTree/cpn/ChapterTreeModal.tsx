import React, { useState } from 'react'
import { Button, Input, List, Modal, Progress, Upload } from 'antd'
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
  const {
    handleUpload,
    isLoading,
    setOpenResourceDrawer,
    openResourceDrawer,
    relatePoints,
    handleRelateCheck,
    progress,
    statusText,
    handleRelatePoints,
    otherComplete
  } = useHandleUploadClassTimeResource({
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
            renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
          />
        </div>
      </Modal>
      <Modal
        title="添加资源并且关联知识点"
        visible={openResourceDrawer}
        mask={false}
        onOk={handleOk}
        closable={false}
        footer={[
          <div style={{ display: 'flex', justifyContent: 'center' }} key={'submit'}>
            <Button
              type={'primary'}
              onClick={() => {
                dispatch({ type: 'setModalState', open: true })
                setOpenResourceDrawer(false)
              }}
            >
              完成并返回
            </Button>
          </div>
        ]}
      >
        <>
          <UploadWrapper style={{ textAlign: 'center', maxHeight: '200px' }}>
            <Upload {...props} className={'upload'}>
              <Button icon={<UploadOutlined />}>请选择上传文件</Button>
            </Upload>
          </UploadWrapper>

          <div>
            {progress !== 0 && (progress === 0 ? <Progress percent={progress} /> : <Progress percent={progress} />)}
            {statusText && <span>视频 {statusText}</span>}
          </div>

          <div>
            {(isLoading || otherComplete.current) &&
              (isLoading ? <Progress percent={50} /> : <Progress percent={100} />)}
            {(isLoading || otherComplete.current) &&
              (isLoading ? <span>非视频文件正在上传</span> : <span>非视频文件上传完毕！</span>)}
          </div>

          <RelatePointsWrapper>
            <GlobalLabel>关联知识点</GlobalLabel>
            <TreeSelected
              checkTreeData={checkTreeData}
              relateKeys={relateKeys}
              handleRelateExpand={handleRelateExpand}
              handleRelateCheck={handleRelateCheck}
              curCheckId={relatePoints}
            />
            <div
              style={{
                padding: '6px',
                borderRadius: '8px',
                backgroundColor: '#2db7f5',
                color: 'white',
                margin: '0 auto',
                textAlign: 'center'
              }}
            >
              Tip: 可以不关联知识点
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} key={'submit'}>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={isLoading}
                style={{ marginTop: 16 }}
              >
                {fileList.length === 0 ? '请先上传文件' : '点击上传'}
              </Button>
            </div>
          </RelatePointsWrapper>
        </>
      </Modal>
    </ChapterTreeModalWrapper>
  )
}
export const ChapterTreeModalWrapper = styled.div`
  position: relative;
`

export const UploadWrapper = styled.div`
  margin-bottom: 13px;
  display: flex;
  flex-flow: column nowrap;
`
export const RelatePointsWrapper = styled.div`
  margin-top: 20px;
  height: 300px;
  overflow: auto;
`
