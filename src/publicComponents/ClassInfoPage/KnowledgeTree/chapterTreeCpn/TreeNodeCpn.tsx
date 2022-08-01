import React, { forwardRef } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { TreeContentTool, TreeContentWrapper } from './TreeContent'
export const TreeNode = forwardRef(
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
    const handleAddChildren = () => {
      setAddState('addChildrenNode')
      showModal()
      setCurentIndex(Onlykey + '')
      setCurTitle(title)
    }
    const handleAddContent = () => {
      setAddState('addChildrenContent')
      showModal()
      setCurentIndex(Onlykey + '')
      setCurTitle(title)
    }
    const handleDeleteContent = () => {
      showDeleteModal()
      setCurentIndex(Onlykey + '')
      setCurTitle(title)
    }
    const editContent = () => {
      setCurentIndex(Onlykey + '')
      setCurTitle(title)
      showEditModal()
    }
    return (
      <TreeNodeWrapper>
        <div ref={ref} className="chapter-title">
          {title}
        </div>
        <TreeNodeTool className="tree-node-tool">
          <Button type={'primary'} onClick={() => handleAddChildren()}>
            + 添加子目录
          </Button>
          <Button type={'primary'} onClick={() => handleAddContent()}>
            + 添加课时
          </Button>
          <Button
            type={'ghost'}
            danger
            onClick={() => handleDeleteContent()}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            删除目录
          </Button>
          <Button type={'primary'} onClick={() => editContent()}>
            重命名
          </Button>
        </TreeNodeTool>
      </TreeNodeWrapper>
    )
  }
)
const TreeNodeWrapper = styled(TreeContentWrapper)``
const TreeNodeTool = styled(TreeContentTool)``
