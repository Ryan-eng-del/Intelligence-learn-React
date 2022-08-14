import React, { useState } from 'react'
import {
  FolderOutlined,
  FolderOpenOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { Collapse, Input, Space, Typography } from 'antd'
import { ChapterCourTimesType, ChapterFolderType } from '../config/types'
import { ChapterTask } from '../ChapterTask/ChapterTask'
import { ChapterFolderWrapper } from './ChapterFolderStyle'
import { FolderHeader } from './FolderHeader'
import { RandomInt } from '../config/util'
import { useMount } from 'hook/useMount'

export const ChapterFolder: React.FC<{
  data: ChapterFolderType[]
  parentHandleAddFolder: (fun: () => void) => void
  openModal: (loc: ChapterFolderType) => void //全局一个modal添加task
}> = ({ data, parentHandleAddFolder, openModal }) => {
  const [dataList, setData] = useState(data) //创建state只为本地更新不刷新
  // 控制 图标
  const [expanded, setExpanded] = useState('')
  const [processing, setProcessing] = useState('')
  // 重命名数据部分
  const [oldName, setOldName] = useState('')
  const [renamingNode, setRenamingNode] = useState('')

  const renameFolder = (item: ChapterFolderType) => {
    setProcessing(item.chapterId) // 切换图标
    console.log('发送请求：', item.chapterId, item.name)
    setTimeout(() => {
      setProcessing('')
    }, 1000)
    // 请求失败还可以
    // item.name = oldName
    setRenamingNode('')
    setData([...data])
  }
  const renameTask = (item: ChapterCourTimesType, name: string) => {
    item.name = name
    console.log('发送请求：', item.taskId, item.name)
    setData([...data])
  }

  const deleteFolder = async (item: ChapterFolderType) => {
    // 请求于此 发送请求
    data.splice(data.findIndex((i) => i == item),1)
    setData([...data])
  }

  const deleteTask = (item: ChapterFolderType, task: ChapterCourTimesType) => {
    item.courTimes = item.courTimes?.filter((i) => i != task)
    setData([...data])
  }

  // 此函数是为当前同级创建目录！，因此应该由父级调用
  // 为什么不为子级创建？因为加载/重命名状态是每级独立的，如为子级添加内容，则无法设置子级的加载/重命名状态
  const addFolder = () => {
    const newItem: ChapterFolderType = {
      // 此处请求！
      chapterId: RandomInt().toString(),
      name: '新建章节',
      childChapters: [],
      courTimes: []
    }
    data.push(newItem)
    setData([...data])
    setProcessing(newItem.chapterId) // 加载动画
    setTimeout(() => setProcessing(''), 1000) // 重置动画
    setRenamingNode(newItem.chapterId) // 重命名状态
  }

  // 挂载时将此函数传与父组件
  useMount(() => {
    console.log(data[0]?.name,"挂载！");

    parentHandleAddFolder(addFolder)
  })

  let ChildAddFolder: () => void //直至子组件挂载之前此处都是 undefined
  const HandleChildFn = (fun: () => void) => {
    ChildAddFolder = fun

  }
  // 为什么创建这一级？直接把ChildAddFolder交给按钮，会保存到子组件挂载之前的undefined
  const InvokeChildAddFolder = (id: string) => {
    if (expanded != id) {
      //该节点未展开,或展开的是其他节点
      setExpanded(id)
    } else {
      ChildAddFolder()
    }
  }

  return (
    <ChapterFolderWrapper>
      <Collapse
        accordion
        activeKey={expanded}
        destroyInactivePanel // 销毁折叠的面板以及时使用useMount更新
        onChange={(id) => setExpanded(id as string)} // 关闭手风琴模式可能导致问题
      >
        {dataList.map((item: ChapterFolderType) => (
          <Collapse.Panel
            collapsible="header"
            key={item.chapterId}
            showArrow={false}
            header={
              <Typography.Title level={5}>
                <Space align="center">
                  {processing == item.chapterId ? (
                    <LoadingOutlined />
                  ) : expanded == item.chapterId ? (
                    <FolderOpenOutlined />
                  ) : (
                    <FolderOutlined />
                  )}{' '}
                  &nbsp;{' '}
                  {item.chapterId == renamingNode ? (
                    <Input
                      style={{ display: 'inline' }}
                      autoFocus
                      defaultValue={item.name}
                      onChange={(e) => (item.name = e.target.value)}
                      onPressEnter={() => renameFolder(item)}
                      onBlur={() => renameFolder(item)}
                    />
                  ) : (
                    item.name
                  )}
                </Space>
              </Typography.Title>
            }
            extra={
              <FolderHeader
                rename={() => (
                  setOldName(item.name), setRenamingNode(item.chapterId)
                )}
                del={() => deleteFolder(item)}
                addFolder={() => InvokeChildAddFolder(item.chapterId)}
                addTask={() => openModal(item)}
              />
            }
          >
            <ChapterFolder
              openModal={openModal}
              data={item.childChapters}
              // 父组件传入一个函数，将自己的addFolder交给父组件
              parentHandleAddFolder={HandleChildFn}
            ></ChapterFolder>
            {item.courTimes ? (
              item.courTimes.map((i) => (
                <ChapterTask
                  del={() => deleteTask(item, i)}
                  key={i.taskId}
                  item={i}
                  rename={(newName) => renameTask(i, newName)}
                />
              ))
            ) : (
              <></>
            )}
          </Collapse.Panel>
        ))}
      </Collapse>
    </ChapterFolderWrapper>
  )
}
