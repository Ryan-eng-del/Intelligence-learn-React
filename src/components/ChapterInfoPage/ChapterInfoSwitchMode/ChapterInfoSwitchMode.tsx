import React, { useState } from 'react'
import { Tabs } from 'antd';
import { ChapterInfoSwitchModeWrapper } from './ChapterInfoSwitchModeStyle'
import { ChapterPreview, ChapterEditorFile, ChapterEditorRich } from 'pages/ChapterInfo'


export const ChapterInfoSwitchMode:React.FC = () => {
  const { TabPane } = Tabs;
  const [existed,setExisted] = useState('false');
  const openEditor = (mode: string) => {
    console.log(mode);
    setExisted(mode)
    // set Tabs activeKey = '2'
  };
  return (
    <ChapterInfoSwitchModeWrapper>
      <Tabs defaultActiveKey="1" centered >
        <TabPane tab="预览模式" key="1">
          <ChapterPreview existed={existed} openEditor={openEditor} />
        </TabPane>
        <TabPane tab="编辑模式" key="2">
          {
            existed == 'file' 
            ? <ChapterEditorFile />
            : <ChapterEditorRich />
          }
        </TabPane>
      </Tabs>
    </ChapterInfoSwitchModeWrapper>
  )
}
