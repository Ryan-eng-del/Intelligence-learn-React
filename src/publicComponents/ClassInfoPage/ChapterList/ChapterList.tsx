import React, { useState } from 'react'
import {
  ChapterListHeaderWrapper,
  ChapterListTitleWrapper
} from './ChapterListStyle'
import { ChapterFolder } from './ChapterFolder/ChapterFolder'
import { ChapterFolderType } from './config/types'
import { useChapterList } from './config/servers/fetchChapterList'
import { AddTaskModal } from './AddTaskModal/AddTaskModal'
import { useLocation } from 'react-router-dom'
import { BaseLoadingProvider } from 'baseUI/BaseLoding/BaseLoading'
import { Button } from 'antd'

export const ChapterList: React.FC = () => {
  const location: any = useLocation()
  const [modalVisable,setModalVisable] = useState(false)
  // TODO: 👇此处存在问题，只有从课程页面点进来才带参数，从其他菜单切入会获取不到
  // 应该传入到classinfo然后作为props传到这个组件
  const courseId = location.state?.id || "2333";
  const { data, isLoading } = useChapterList(courseId)
  console.log("ChapterList",data);

  return (
    <BaseLoadingProvider loading={isLoading}>
      {/* 页头 */}
      <ChapterListHeaderWrapper>
        <ChapterListTitleWrapper>
          <div className="ChapterList-page-title">章节</div>
          <Button
            type='primary'
            onClick={()=>setModalVisable(true)}
            style={{ marginBottom: '24px' }}
          >
            添加章节
          </Button>
        </ChapterListTitleWrapper>
      </ChapterListHeaderWrapper>
      {/* 添加任务 */}
      <AddTaskModal display={modalVisable} close={()=>setModalVisable(false)} />
      {/* 主体内容 */}
      <ChapterFolder parentHandleAddFolder={()=>()=>console.log(2333)} data={data as unknown as ChapterFolderType[]} />
    </BaseLoadingProvider>
  )
}
