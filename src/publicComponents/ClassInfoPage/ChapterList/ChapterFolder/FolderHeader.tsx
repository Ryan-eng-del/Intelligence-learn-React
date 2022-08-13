import React, { useState } from 'react'
import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  PlusSquareOutlined
} from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

export const FolderHeader: React.FC<{
  del: () => void
  rename: () => void
  addTask: () => void
  addFolder: () => void
}> = ({ del, rename, addTask, addFolder }) => {
  const [hover, setHover] = useState(false)
  // 删除部分
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      del()
      setVisible(false)
      setConfirmLoading(false)
    }, 1500)
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ minWidth: '600px' }}
    >
      {/* 别以为这个看不见的按钮没用，此元素隐藏后无法触发事件，有更好的解决方案请修改 */}
      <Button type="text"> </Button>
      <span style={{ float: 'right', display: hover ? 'block' : 'none' }}>
        <Button type="primary" onClick={addTask} icon={<PlusOutlined />}>
          添加子任务
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          onClick={addFolder}
          icon={<PlusSquareOutlined />}
        >
          添加子目录
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={rename} icon={<EditOutlined />}>
          编辑
        </Button>
        &nbsp;&nbsp;
        <Popconfirm
          placement="left"
          visible={visible}
          title="确认删除吗？其中全部内容都会被删除！"
          onConfirm={handleOk}
          okText="是"
          onCancel={() => setVisible(false)}
          okButtonProps={{ loading: confirmLoading }}
          cancelText="否"
        >
          <Button
            type="primary"
            danger
            onClick={() => setVisible(true)}
            icon={<CloseOutlined />}
          >
            删除
          </Button>
        </Popconfirm>
      </span>
    </div>
  )
}
