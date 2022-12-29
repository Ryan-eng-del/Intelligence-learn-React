import React, { useState } from 'react'
import { Button, Drawer, Input, List, Modal, Progress, RadioChangeEvent, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { useHandleUploadClassTimeResource } from 'hook/useChapterStudy/useHandleUploadClassTimeResource'
import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { uploadProps } from 'hook/useChapterStudy/config'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import { PrimaryButton } from '../../../../../publicComponents/Button'
import { GlobalMessage } from '../../../../../publicComponents/GlobalMessage'

export const ChapterTreeModal: React.FC<{
  checkTreeData: any
  handleRelateCheck: any
  relateKeys: any
  handleRelateExpand: any
  handleOk: any
  addContentLoading: boolean
}> = ({ checkTreeData, handleRelateExpand, handleOk, relateKeys, addContentLoading }) => {
  const [fileList, setFileList] = useState<any>([])

  /*ClassTime Reducer*/
  const { dispatch, classTimeState } = useClassTimeDispatch()

  /*上传资源，关联知识点*/
  const {
    handleUpload,
    setOpenResourceDrawer,
    openResourceDrawer,
    relatePoints,
    handleRelateCheck,
    progress,
    statusText,
    isVideoStart,
    isOtherStart,
    otherProgress,
    setRelatePoints
  } = useHandleUploadClassTimeResource({
    dispatch,
    fileList
  })
  /*Upload Props*/
  const props = uploadProps(fileList, setFileList)
  const onCloseClassTimeDrawer = () => {
    dispatch({ type: 'setModalState', open: false })
    dispatch({ type: 'setFileList', fileObj: () => [] })
    dispatch({ type: 'setName', name: '' })
  }
  const onCloseResourceDrawer = () => {
    setOpenResourceDrawer(false)
    dispatch({ type: 'setModalState', open: true })
    setRelatePoints([])
  }

  return (
    <ChapterTreeModalWrapper className="">
      <Drawer
        title="添加课时"
        visible={classTimeState?.courseTimeModalVisible}
        onClose={onCloseClassTimeDrawer}
        size={'large'}
        mask={false}
        width={'100vw'}
      >
        <div style={{ width: '800px', margin: '0 auto' }}>
          <GlobalLabel htmlFor={'addResource'}>课时名称</GlobalLabel>
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
                setFileList([])
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
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <Button size={'large'} type={'primary'} onClick={handleOk} loading={addContentLoading}>
              完成
            </Button>
          </div>
        </div>
      </Drawer>

      <Drawer
        title="添加资源并且关联知识点"
        visible={openResourceDrawer}
        mask={false}
        width={'100vw'}
        onClose={onCloseResourceDrawer}
        closable={true}
      >
        <div style={{ width: '800px', margin: '0 auto' }}>
          <UploadWrapper style={{ textAlign: 'center', maxHeight: '200px' }}>
            <Upload {...props} className={'upload'}>
              <Button icon={<UploadOutlined />}>请选择上传文件</Button>
            </Upload>
          </UploadWrapper>

          {isVideoStart && (
            <div>
              <Progress percent={progress} />
              statusText && <span>视频 {statusText}</span>
            </div>
          )}

          <div>
            {isOtherStart && (
              <div>
                <Progress percent={otherProgress} />
                otherProgress === 50 ? <span>非视频文件正在上传</span> : <span>非视频文件上传完毕！</span>
              </div>
            )}
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} key={'submit'}>
              <PrimaryButton
                title={'完成'}
                handleClick={async () => {
                  await handleUpload()
                  setTimeout(() => {
                    onCloseResourceDrawer()
                  }, 1000)
                  GlobalMessage('success', '资源上传成功！👋👋')
                }}
              />
            </div>
          </RelatePointsWrapper>
        </div>
      </Drawer>
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
