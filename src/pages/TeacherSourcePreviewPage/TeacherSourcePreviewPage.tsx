import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMount } from '../../hook/useMount'

import styled from 'styled-components'
import { Tree } from 'antd/es'
import { useChapterUI } from '../../hook/useChapterStudy/useChapterUI'
import { expandOnMount } from '../../util/chapterStudyTree'
import { Button } from 'antd'

export const TeacherSourcePreviewPage = () => {
  const { treeData, setExpandKeys, data, expandKeys, handleOnExpand } =
    useChapterUI('show')

  useMount(() => {
    setExpandKeys(expandOnMount(data!))
  })

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
            expandedKeys={expandKeys}
            onExpand={handleOnExpand}
            onSelect={handleOnExpand}
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
  width: 600px;
  height: 700px;
  overflow: scroll;
  overflow-x: hidden;
`
