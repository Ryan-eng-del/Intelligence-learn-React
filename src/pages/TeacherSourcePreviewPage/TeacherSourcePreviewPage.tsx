import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

import styled from 'styled-components'
import { Tree } from 'antd/es'
import { useChapterUI } from '../../hook/useChapterStudy/useChapterUI'
import { Button } from 'antd'
import { expandOnMount } from '../../helper/chapterStudyTree'

export const TeacherSourcePreviewPage = () => {
  const { treeData, chapterControl } = useChapterUI(true)

  useEffect(() => {
    chapterControl.dispatchChapter({
      type: 'setExpandKeys',
      expandKeys: () => expandOnMount(chapterControl.data || [])
    })
  }, [chapterControl.dispatchChapter, chapterControl.data])

  return (
    <>
      <TeachPreviewWrapper>
        <PreviewContentWrapper>
          <div>
            <Link to={'/classinfo/chapter'}>
              <Button type={'primary'}>返回编辑页面</Button>
            </Link>
          </div>
          <Tree
            expandedKeys={chapterControl.expandKeys}
            onExpand={chapterControl.handleOnExpand}
            onSelect={chapterControl.handleOnExpand}
          >
            {treeData}
          </Tree>
        </PreviewContentWrapper>
        <Outlet />
      </TeachPreviewWrapper>
    </>
  )
}
const TeachPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const PreviewContentWrapper = styled.div`
  margin-right: 100px;
  width: 500px;
  height: 700px;
  overflow: scroll;
  overflow-x: hidden;
`
