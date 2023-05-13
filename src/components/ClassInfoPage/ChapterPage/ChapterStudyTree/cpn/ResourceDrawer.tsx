import { UploadOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Drawer, Dropdown, Progress, Upload } from 'antd'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React from 'react'
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
  relateKeys: any
  handleRelateExpand: any
  handleRelateCheck: (checkInfo: any) => void
  relatePoints: any
  Uploadprops: any
  handleUpload: any
  handleUpHomework: any
  classId: string
}> = ({
  open,
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
  classId
}) => {
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
      <Drawer title="添加资源并且关联知识点" open={open} mask={false} width="100vw">
        <div style={{ width: '800px', margin: '0 auto' }}>
          <UploadWrapper style={{ textAlign: 'center', maxHeight: '200px' }}>
            <Dropdown menu={{ items }}>
              <Button icon={<UploadOutlined />}>请选择上传资源</Button>
            </Dropdown>
            <Upload {...Uploadprops} className={'upload'}></Upload>
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
