import React, { forwardRef } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
export const TreeContent = forwardRef(
  (
    {
      title,
      showModal,
      setAddState,
      Onlykey,
      setCurentIndex,
      showDeleteModal,
      setCurTitle,
      showEditModal
    }: any,
    ref: any
  ) => {
    const handleAddContent = () => {
      setAddState('addChildrenContent')
      showModal()
      setCurentIndex(Onlykey)
      setCurTitle(title)
    }
    const handleDeleteContent = () => {
      showDeleteModal(true)
      setCurentIndex(Onlykey)
      setCurTitle(title)
    }
    const editContent = () => {
      setCurentIndex(Onlykey)
      setCurTitle(title)
      showEditModal()
    }
    const navigate = useNavigate()
    return (
      <TreeContentWrapper>
        <div ref={ref} className="chapter-title">
          {title}
        </div>
        <TreeContentTool className="tree-node-tool">
          <Button type={'primary'} onClick={() => handleAddContent()}>
            + 添加课时
          </Button>
          <Button type={'primary'}>编辑课时</Button>
          <Button type={'primary'} onClick={() => navigate('/chapterinfo')}>
            进入课时
          </Button>
          <Button
            type={'ghost'}
            danger
            onClick={() => handleDeleteContent()}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            删除课时
          </Button>
          <Button type={'primary'} onClick={() => editContent()}>
            重命名
          </Button>
        </TreeContentTool>
      </TreeContentWrapper>
    )
  }
)
export const TreeContentWrapper = styled.div`
  height: 100%;
  div.chapter-title {
    color: white;
    line-height: 100%;
    height: 100%;
    line-height: 40px;
    padding-left: 20px;
  }
  &:hover {
    .tree-node-tool {
      opacity: 1;
      display: block;
    }
  }
`
export const TreeContentTool = styled.div`
  top: 50%;
  left: 25%;
  transform: translateY(-50%);
  position: absolute;
  opacity: 0;
  transition: opacity 300ms;
  height: 100%;
  width: 100%;
  button.ant-btn-primary.ant-btn {
    border: none;
    height: 30px;
    &:hover {
      border: none;
    }
  }
`
