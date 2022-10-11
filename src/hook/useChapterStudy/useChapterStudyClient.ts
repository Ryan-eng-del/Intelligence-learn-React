import { UploadFile } from 'antd'
import { InternalUploadFile } from 'antd/lib/upload/interface'
import { useState } from 'react'

export const useChapterClient = () => {
  /*:受控树展开的节点 :用来控制树*/
  const [expandKeys, setExpandKeys] = useState<string[]>([])
  /*:当前input框的值*/
  const [curAddInputValue, setAddInputValue] = useState('')
  /*:当前的状态是处于编辑或者添加状态 :用来表示树的添加和编辑的交互*/
  const [focusStatus, setFocusStatus] = useState(false)
  /*用来表示当前重命名的节点*/
  const [curRenameNode, setCurRenameNode] = useState<any>({})
  /*:用来表示当前的添加节点*/
  const [curNode, setCurNode] = useState<any>({})
  /*:表示当前添加节点的类型是根节点还是子节点 :根据状态将添加父和添加子封装到一起*/
  const [curAddType, setCurAddType] = useState('')
  /*:表示添加课时弹框的开闭状态*/
  const [isModalVisible, setIsModalVisible] = useState(false)
  /*:表示当前添加的课时名字状态*/
  const [resourceTitle, setResourceTitle] = useState('')
  /*：表示当前添加的资源类型**/
  const [uploadType, setUploadType] = useState('视频')
  /*:表示正在向该id下的节点添加*/
  const [curChapterId, setCurChapterId] = useState('')
  /*:添加课时弹框*/
  const [addContentNodeModal, setAddContentNodeModal] = useState(false)
  /*：添加资源Obj*/
  const [resourceObj, setResourceObj] = useState([])
  /*:表示当前添加的课时节点*/
  const [curContentNode, setCurContentNode] = useState<any>({})
  /* 当前添加资源的名字列表 */
  const [curFileListName, setCurFileListName] = useState<{ title: string }[]>(
    []
  )
  /* 当前上传的文件列表 */
  const [fileList, setFileList] = useState([])
  //toDo 优化目的：减少共享状态层的状态，增强维护性
  //toDo 优化建议：1: clienState: {allState}
  //toDo 优化建议：2：可不可以分出单独的，不会影响其他状态的state，放在小的组件当中。不然太臃肿，减少该组件的Hook Queue的长度

  return {
    curFileListName,
    setCurFileListName,
    fileList,
    setFileList,
    curAddType,
    setCurAddType,
    curContentNode,
    setCurContentNode,
    addContentNodeModal,
    setAddContentNodeModal,
    expandKeys,
    setExpandKeys,
    curAddInputValue,
    setAddInputValue,
    focusStatus,
    setFocusStatus,
    curRenameNode,
    setCurRenameNode,
    curNode,
    setCurNode,
    isModalVisible,
    setIsModalVisible,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setUploadType,
    curChapterId,
    setCurChapterId,
    resourceObj,
    setResourceObj
  }
}
