import React, { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { Tree } from 'antd/es'
import { useChapterUI } from '../../hook/useChapterStudy/useChapterUI'
import { Drawer } from 'antd'
import { expandOnMount } from '../../helper/chapterStudyTree'

export const TeacherSourcePreviewPage = () => {
  const { treeData, chapterControl } = useChapterUI(false)
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const computedRoute = useMemo(() => {
    const index = location.pathname.indexOf('chapter')
    return location.pathname.slice(0, index + 7)
  }, [location.pathname])

  const onClose = () => {
    setOpen(false)
    navigate(computedRoute)
  }

  useEffect(() => {
    chapterControl.dispatchChapter({
      type: 'setExpandKeys',
      expandKeys: () => expandOnMount(chapterControl.data || [])
    })
  }, [chapterControl.dispatchChapter, chapterControl.data])

  return (
    <div>
      <Drawer
        title={`章节学习资源`}
        placement="right"
        size={'large'}
        style={{ width: '100vw' }}
        onClose={onClose}
        visible={open}
        mask={false}
      >
        <TeachPreviewWrapper>
          <PreviewContentWrapper>
            <Tree
              expandedKeys={chapterControl.expandKeys}
              onExpand={chapterControl.handleOnExpand}
              onSelect={chapterControl.handleOnExpand}
            >
              {treeData}
            </Tree>
          </PreviewContentWrapper>
          <div style={{ borderRight: '1px solid rgb(155, 155, 155)' }}></div>
          <ResourceWrapper>
            <Outlet />
          </ResourceWrapper>
        </TeachPreviewWrapper>
      </Drawer>
    </div>
  )
}
const TeachPreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const PreviewContentWrapper = styled.div`
  width: 30%;
  margin-right: 100px;
`
const ResourceWrapper = styled.div`
  width: 60%;
`
