import { UploadOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import type { MenuProps } from 'antd'
import { Button, Drawer, Progress, Upload } from 'antd'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React from 'react'
import { useParams } from 'react-router-dom'
import { RelatePointsWrapper, UploadWrapper } from './ChapterTreeModal'
import { UpdateHomework } from './UpdateHomework'

type uploadStatus = {
  isStart: boolean
  text: string
  progress: number
}

export const ResourceDrawer: React.FC<{
  open: boolean
  videoStatus: uploadStatus
  otherStatus: uploadStatus
  checkTreeData: any
  close: () => void
  relateKeys: any
  handleRelateExpand: any
  handleRelateCheck: (checkInfo: any) => void
  relatePoints: any
  Uploadprops: any
  flash: any
  handleUpload: any
  handleUpHomework: any
  classId: string
  setFlush: any
}> = ({
  open,
  close,
  videoStatus,
  otherStatus,
  checkTreeData,
  relateKeys,
  relatePoints,
  handleRelateCheck,
  handleRelateExpand,
  handleUpload,
  handleUpHomework,
  Uploadprops,
  classId,
  setFlush,
  flash
}) => {
  const queryClient = useQueryClient()
  const courseId = useParams().id!
  // TODO:在updateprops中添加hwkList
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Upload {...Uploadprops} showUploadList={false} className={'upload'}>
          <p>本地文件</p>
        </Upload>
      )
    },
    {
      key: '2',
      label: <UpdateHomework handleUpHomework={handleUpHomework} classId={classId}></UpdateHomework>
    }
  ]
  return (
    <div>
      <Drawer title="添加资源并且关联知识点" open={open} mask={false} width="100vw" onClose={close} closable={true}>
        <div style={{ width: '800px', margin: '0 auto' }}>
          <UploadWrapper style={{ textAlign: 'center', maxHeight: '200px' }}>
            <Upload {...Uploadprops} className={'upload'}>
              <Button icon={<UploadOutlined />}>请选择上传资源</Button>
            </Upload>
          </UploadWrapper>

          {videoStatus.isStart && (
            <div>
              <Progress percent={videoStatus.progress} />
              <span>视频 {videoStatus.text}</span>
            </div>
          )}

          {otherStatus.isStart && (
            <div>
              <Progress percent={otherStatus.progress} />
              {`非视频文件${otherStatus.progress === 50 ? '正在上传' : '上传完毕！'}`}
            </div>
          )}

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
                  try {
                    await handleUpload()
                    setTimeout(() => {
                      close()
                    }, 1000)
                    setFlush(!flash)
                    queryClient.invalidateQueries([`resources-${courseId}`])
                    // resources-${courseId}
                    GlobalMessage('success', '资源上传成功！👋👋')
                  } catch (err) {
                    GlobalMessage('error', '资源上传失败！👋👋')
                  }
                }}
              />
            </div>
          </RelatePointsWrapper>
        </div>
      </Drawer>
    </div>
  )
}
