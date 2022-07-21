import React, { useState } from 'react'
import { Tabs, Popconfirm } from 'antd'
import {
  ChapterInfoSwitchModeWrapper,
  PointsWrapper
} from './ChapterInfoSwitchModeStyle'
import {
  ChapterPreviewRich,
  ChapterPreviewFile,
  ChapterEditorFile,
  ChapterEditorRich,
  AssociateKnowledgePoints
} from 'pages/ChapterInfo'
import { Button } from 'antd'

export const ChapterInfoSwitchMode: React.FC = () => {
  const { TabPane } = Tabs
  const [existed, setExisted] = useState('')
  const [disableEdit, setDisableEdit] = useState(true)
  const [activeKey, setActiveKey] = useState('1')
  const openEditor = (mode: string) => {
    setExisted(mode) //设定章节模式
    setDisableEdit(false) //启用编辑
    setActiveKey('2') //自动切换到编辑模式
  }
  const operations = (
    <>
      <Button type={'primary'} style={{ marginRight: '12px' }}>
        保存编辑
      </Button>
      <Popconfirm
        style={{ marginLeft: 70, whiteSpace: 'nowrap' }}
        placement="leftTop"
        title="你确定要删除吗？"
        onConfirm={() => {
          setExisted('')
          setDisableEdit(true)
          setActiveKey('1')
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button type={'primary'}>删除编辑</Button>
      </Popconfirm>
    </>
  )

  return (
    <ChapterInfoSwitchModeWrapper>
      <Tabs
        defaultActiveKey="1"
        centered
        activeKey={activeKey}
        onTabClick={(e) => setActiveKey(e)}
        tabBarExtraContent={operations}
      >
        <TabPane tab="预览模式" key="1">
          {existed == 'file' ? (
            <ChapterPreviewFile />
          ) : existed == 'rich' ? (
            <ChapterPreviewRich />
          ) : (
            <div style={{ color: '#64ffda', paddingBottom: '23px' }}>
              你当前还没有上传课件
              <br />
              <Button onClick={() => openEditor('file')}>上传文件</Button>
              <Button onClick={() => openEditor('rich')}>打开在线编辑器</Button>
            </div>
          )}
        </TabPane>
        <TabPane tab="编辑模式" disabled={disableEdit} key="2">
          {existed == 'file' ? <ChapterEditorFile /> : <ChapterEditorRich />}
        </TabPane>
        <TabPane tab="关联知识点" key="3">
          <PointsWrapper>
            <AssociateKnowledgePoints />
          </PointsWrapper>
        </TabPane>
      </Tabs>
    </ChapterInfoSwitchModeWrapper>
  )
}
