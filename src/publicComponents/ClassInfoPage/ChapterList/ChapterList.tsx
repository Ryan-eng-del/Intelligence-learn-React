import React from 'react'
import {
  ChapterListHeaderWrapper,
  ChapterListTitleWrapper
  // ModalContextWrapper
} from './ChapterListStyle'
import { ChapterFolder } from './ChapterFolder/ChapterFolder'
import { ChapterFolderType } from './config/types'
import { useChapterList } from './config/servers/fetchChapterList'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
// import { useMount } from 'hook/useMount'
import { AddTaskModal } from './AddTaskModal/AddTaskModal'
import { useLocation } from 'react-router-dom'

export const ChapterList: React.FC = () => {
  const location: any = useLocation()
  const courseId = location.state.id;
  const { data, isLoading} = useChapterList(courseId)

  if (isLoading) return <BaseSpin title="正在查询中……"></BaseSpin>

  return (
    <>
      {/* 页头 */}
      <ChapterListHeaderWrapper>
        <ChapterListTitleWrapper>
          <div className="ChapterList-page-title">章节</div>
          {/* <Button
            type={'primary'}
            onClick={handleAddChapter}
            style={{ marginBottom: '24px' }}
          >
            添加章节
          </Button> */}
        </ChapterListTitleWrapper>
      </ChapterListHeaderWrapper>
      {/* 添加任务 */}
      <AddTaskModal></AddTaskModal>
      {/* 主体内容 */}
      <ChapterFolder data={data as unknown as ChapterFolderType[]}></ChapterFolder>
    </>
  )
}
