import React, { useState } from 'react'
import { Tag, Button, Input, Space, Popconfirm } from 'antd'
// import { useNavigate } from 'react-router-dom'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { ChapterTaskWrapper } from './ChapterTaskStyle'
import { ChapterCourTimesType } from '../config/types'

export const ChapterTask: React.FC<{
  item: ChapterCourTimesType
  del: () => void
  rename: (newName: string) => void
}> = ({ item, del, rename }) => {
  const [hover, setHover] = useState(false)
  const [renaming, setRenaming] = useState(false)

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
  // const navigator = useNavigate()
  return (
    <>
      <ChapterTaskWrapper
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Space>
          <Tag color="blue">{item.tag}</Tag>
          {renaming ? (
            <Input
              style={{ display: 'inline' }}
              autoFocus
              defaultValue={item.name}
              onChange={(e) => (item.name = e.target.value)}
              onPressEnter={() => (rename(item.name), setRenaming(false))}
              onBlur={() => setRenaming(false)}
            />
          ) : (
            item.name
          )}
        </Space>
        {hover ? (
          <div style={{ float: 'right' }}>
            <Button
              type="primary"
              onClick={() => setRenaming(true)}
              icon={<EditOutlined />}
            >
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
          </div>
        ) : (
          <></>
        )}
      </ChapterTaskWrapper>
    </>
  )
}
