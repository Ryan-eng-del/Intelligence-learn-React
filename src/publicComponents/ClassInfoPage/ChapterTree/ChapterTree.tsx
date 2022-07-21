import { Tree, Button, Modal, Input } from 'antd'
import React, { createRef, useState } from 'react'
import { TreeNode } from './chapterTreeCpn/TreeNodeCpn'
import { FolderOutlined, ReadOutlined } from '@ant-design/icons'
import { TreeContent } from './chapterTreeCpn/TreeContent'
import { DataNode, TreeProps } from 'antd/lib/tree'
import { TreeWrapper } from './ChapterTreeStyle'
const defaultData: any = []
const ref: any = createRef()
export const ChapterTree = () => {
  const [gData, setGData] = useState(defaultData)
  const [addTreeNodeData, setTreeNodeData] = useState<any>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [curentIndex, setCurentIndex] = useState('')
  const [addState, setAddState] = useState('addRootTreeNode')
  const [curTitle, setCurTitle] = useState('')
  const [editValue, setEditValue] = useState('')
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    setEditValue('')
  }
  const showDeleteModal = () => {
    setDeleteModalVisible(true)
  }
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false)
    setEditValue('')
  }
  const handleChildren = () => {
    showModal()
    setAddState('addRootTreeNode')
  }
  const handleOk = () => {
    setIsModalVisible(false)
    setEditValue('')
    setTreeNodeData('')
    let newData = null
    let findTreeNode: (data: any, curentIndex: any) => void = (
      data: any,
      currentIndex: any
    ) => {
      console.log(data, currentIndex)
    }
    let findTreeNodex: (data: any, curentIndex: any) => void = (
      data: any,
      currentIndex: any
    ) => {
      console.log(data, currentIndex)
    }
    switch (addState) {
      case 'addRootTreeNode':
        newData = [...gData]
        newData.push({
          title: (
            <TreeNode
              title={addTreeNodeData}
              setAddState={setAddState}
              showModal={showModal}
              Onlykey={gData.length + ''}
              setCurentIndex={setCurentIndex}
              showDeleteModal={showDeleteModal}
              setCurTitle={setCurTitle}
              showEditModal={showEditModal}
              ref={ref}
            />
          ),
          key: gData.length + '',
          icon: <FolderOutlined />,
          children: [],
          titleValue: addTreeNodeData
        })
        setGData([...newData])
        break
      case 'addChildrenNode':
        newData = [...gData]
        findTreeNode = function (data: any, curentIndex: any) {
          data.forEach((treeNode: any) => {
            if (treeNode.children.length) {
              findTreeNode(treeNode.children, curentIndex)
            }
            if (treeNode.key === curentIndex) {
              const random = (Math.random() * 100).toFixed(5)
              treeNode.children.push({
                title: (
                  <TreeNode
                    title={addTreeNodeData}
                    setAddState={setAddState}
                    showModal={showModal}
                    Onlykey={random}
                    setCurentIndex={setCurentIndex}
                    showDeleteModal={showDeleteModal}
                    setCurTitle={setCurTitle}
                    showEditModal={showEditModal}
                    ref={ref}
                  />
                ),
                key: random,
                icon: <FolderOutlined />,
                children: [],
                titleValue: addTreeNodeData
              })
            }
          })
        }
        findTreeNode(newData, curentIndex)
        setGData([...newData])
        break
      case 'addChildrenContent':
        newData = [...gData]
        findTreeNodex = function (data: any, curentIndex: any) {
          data.forEach((treeNode: any) => {
            if (treeNode.children.length) {
              findTreeNodex(treeNode.children, curentIndex)
            }
            if (treeNode.key === curentIndex) {
              console.log(treeNode.children, 'children')
              const random = (Math.random() * 100).toFixed(5)
              treeNode.children.push({
                title: (
                  <TreeContent
                    title={addTreeNodeData}
                    setAddState={setAddState}
                    showModal={showModal}
                    Onlykey={random}
                    setCurentIndex={setCurentIndex}
                    showDeleteModal={showDeleteModal}
                    setCurTitle={setCurTitle}
                    showEditModal={showEditModal}
                    ref={ref}
                  />
                ),
                key: random,
                icon: <ReadOutlined />,
                children: [],
                titleValue: addTreeNodeData
              })
            }
          })
        }
        findTreeNodex(newData, curentIndex)
        setGData([...newData])
        break
      default:
        return new Error()
    }
  }

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback)
        }
      }
    }
    const data = [...gData]

    // Find dragObject
    let dragObj: DataNode
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar: DataNode[] = []
      let i: number
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!)
      } else {
        ar.splice(i! + 1, 0, dragObj!)
      }
    }
    setGData(data)
  }
  const handleDelete = () => {
    setDeleteModalVisible(false)
    setEditValue('')
    const newData = [...gData]
    const findTreeNode = function (data: any, curentIndex: any) {
      data.forEach((treeNode: any, index: any) => {
        if (treeNode)
          if (treeNode.children.length) {
            findTreeNode(treeNode.children, curentIndex)
          }
        if (treeNode.key === curentIndex) {
          data.splice(index, 1)
        }
      })
    }
    findTreeNode(newData, curentIndex)
    setGData([...newData])
  }
  const showEditModal = () => {
    setEditModalVisible(true)
  }
  const hanleEditCancel = () => {
    setEditModalVisible(false)
  }
  const handleEdit = () => {
    setEditModalVisible(false)
    ref.current.innerHTML = editValue
    const newData = [...gData]
    const findTreeNodex = function (data: any, curentIndex: any) {
      data.forEach((treeNode: any) => {
        if (treeNode.children.length) {
          findTreeNodex(treeNode.children, curentIndex)
        }
        if (treeNode.key === curentIndex) {
          treeNode.titleValue = editValue
        }
      })
    }
    findTreeNodex(newData, curentIndex)
    setGData([...newData])
  }
  return (
    <TreeWrapper>
      <Button
        type={'primary'}
        onClick={() => handleChildren()}
        style={{ marginBottom: '24px' }}
      >
        添加根章节目录
      </Button>
      <Tree
        defaultExpandAll
        showIcon
        className="draggable-tree"
        draggable
        blockNode
        onDrop={onDrop}
        treeData={gData}
      />
      <Modal
        title="添加子目录"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className={'add-children-node'}>
          您正在
          {addState === 'addRootTreeNode' ? (
            '添加根目录'
          ) : addState === 'addChildrenContent' ? (
            <span>
              向
              <strong style={{ color: '#64ffda', padding: '0 5px' }}>
                {curTitle}
              </strong>
              当中添加课时
            </span>
          ) : (
            <span>
              向
              <strong style={{ color: '#64ffda', padding: '0 5px' }}>
                {curTitle}
              </strong>
              当中添加子目录
            </span>
          )}
        </div>
        <Input
          value={addTreeNodeData}
          onChange={(e) => setTreeNodeData(e.target.value)}
        ></Input>
      </Modal>
      <Modal
        title="重命名"
        visible={editModalVisible}
        onOk={handleEdit}
        okText="确认"
        cancelText="取消"
        onCancel={hanleEditCancel}
      >
        <div className="tip-rename">
          您正在
          {addState === 'addRootTreeNode'
            ? `重命名`
            : addState === 'addChildrenContent'
            ? `重命名${curTitle}课时`
            : `重命名${curTitle}子目录`}
        </div>
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        ></Input>
      </Modal>
      <Modal
        title="删除"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className="tip-delete">
          您确认要删除{curTitle}吗？其下的子节点都会被删除噢！
        </div>
      </Modal>
    </TreeWrapper>
  )
}
