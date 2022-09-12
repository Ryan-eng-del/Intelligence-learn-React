import React, { useState } from 'react'
import { Tabs, Badge, List, Button, Modal, Typography } from 'antd'
const { TabPane } = Tabs
const { Paragraph } = Typography
import {
  CommentOutlined,
  TeamOutlined,
  MailOutlined,
  HeartOutlined,
  HeartFilled,
  ContainerOutlined
} from '@ant-design/icons'
import { InboxWrapper } from './InobxPageStyle'

type msgItem = {
  tag: string
  from: string
  expire: number
  Readed: boolean
  isFavority: boolean
  msgID: number
  content: string
}

export const InboxPage: React.FC = () => {
  const [chosen, setChosen] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [onDisplayMsg, setOnDisplayMsg] = useState<msgItem>()
  const data: msgItem[] = [
    {
      tag: 'Notice',
      from: 'Teacher',
      expire: 1600000,
      Readed: false,
      isFavority: true,
      msgID: 1,
      content: '发布了新作业。。'
    },
    {
      tag: 'Broadcast',
      from: 'UserID',
      expire: 1600000,
      Readed: false,
      isFavority: false,
      msgID: 2,
      content: '关于校园十大歌手比赛。。'
    }
  ]
  const [msgList, setMsgList] = useState<msgItem[]>(data)

  const readMsg = (item: msgItem) => {
    setOnDisplayMsg(item)
    setShowModal(true)
    item.Readed = true
    setMsgList(msgList.filter(() => true))
  }
  const favMsg = (item: msgItem) => {
    item.isFavority = !item.isFavority
    setMsgList(msgList.filter(() => true))
  }

  const showBadge = (tag: string) => {
    let show = false
    msgList
      .filter((item) => (tag == '' ? true : item.tag == tag))
      .forEach((i) => {
        if (!i.Readed) show = true
      })
    return show
  }

  return (
    <>
      <InboxWrapper>
        <Tabs
          activeKey={chosen}
          onChange={(key: string) => {
            setChosen(key)
          }}
          centered
        >
          <TabPane
            tab={
              <Badge dot={showBadge('')}>
                <MailOutlined />
                全部消息
              </Badge>
            }
            key="All"
          ></TabPane>
          <TabPane
            tab={
              <Badge dot={showBadge('Notice')}>
                <CommentOutlined />
                课程通知
              </Badge>
            }
            key="Notice"
          ></TabPane>
          <TabPane
            tab={
              <Badge dot={showBadge('Broadcast')}>
                <ContainerOutlined />
                推广信息
              </Badge>
            }
            key="Broadcast"
          ></TabPane>
          <TabPane
            tab={
              <Badge dot={false}>
                <HeartOutlined />
                收藏待办
              </Badge>
            }
            key="Favority"
          ></TabPane>
        </Tabs>
        <List
          itemLayout="horizontal"
          dataSource={msgList.filter((item) => {
            //过滤条件
            switch (chosen) {
              case 'All':
                return true
              case 'Favority':
                return item.isFavority
              default:
                return item.tag == chosen
            }
          })}
          renderItem={(item) => (
            <>
              <List.Item
                onClick={() => readMsg(item)}
                // style={{ display: 'inline-block' }}
              >
                <List.Item.Meta
                  key={item.msgID}
                  avatar={<TeamOutlined />}
                  title={<Badge dot={!item.Readed}>{item.from}</Badge>}
                  description={
                    <Paragraph ellipsis={true}>{item.content}</Paragraph>
                  }
                />
                <Button onClick={() => favMsg(item)}>
                  {item.isFavority ? <HeartFilled /> : <HeartOutlined />}
                </Button>
              </List.Item>
            </>
          )}
        />
      </InboxWrapper>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        title={onDisplayMsg?.from}
      >
        {onDisplayMsg?.content}
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi harum
        tenetur nobis quae delectus soluta enim necessitatibus alias sed
        possimus aspernatur laboriosam, sunt nisi deleniti accusantium vero
        quas? Ut, culpa?
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex natus
        magnam voluptates assumenda id qui, possimus cumque eligendi dolorem
        omnis perspiciatis dolores animi. Voluptatum, facere excepturi.
        Architecto fugiat placeat adipisci!
      </Modal>
    </>
  )
}
