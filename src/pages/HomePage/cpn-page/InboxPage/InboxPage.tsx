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
import { ReadOnlyModal } from './Contact/ReadOnlyModal'
import { ContactModal } from './Contact/ContactModal'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'

type msgItem = {
  tag: string
  from: string
  expire: number
  Readed: boolean
  isFavority: boolean
  msgID: number
  pre: string
  content: string
}

export const InboxPage: React.FC = () => {
  const [chosen, setChosen] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [Contact, setContact] = useState(false)

  const [onDisplayMsg, setOnDisplayMsg] = useState<msgItem>()
  const data: msgItem[] = [
    {
      tag: 'Notice',
      from: 'Teacher',
      expire: 1600000,
      Readed: false,
      isFavority: true,
      msgID: 1,
      pre: '发布了新作业。。',
      content: "老师发布了一则新作业，<a>前往完成</a>。"
    },
    {
      tag: 'Broadcast',
      from: 'UserID',
      expire: 1600000,
      Readed: false,
      isFavority: false,
      msgID: 2,
      pre: '关于校园十大歌手比赛。。',
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, velit, temporibus quis sed magni dignissimos, eum deleniti quidem officiis commodi labore. Est minus, mollitia quas temporibus eius recusandae eos quo."
    },
    {
      tag: 'Private',
      from: 'UserID2',
      expire: 1600000,
      Readed: false,
      isFavority: false,
      msgID: 4,
      pre: "最后一条新消息",
      content: '私信测试'
    }
  ]
  const [msgList, setMsgList] = useState<msgItem[]>(data)

  const readMsg = (item: msgItem) => {
    setOnDisplayMsg(item)
    item.tag == 'Private' ? setContact(true) : setShowModal(true)
    item.Readed = true
    setMsgList(msgList.filter(() => true))
  }
  const favMsg = (e:any, item: msgItem) => {
    e.stopPropagation()
    item.isFavority = !item.isFavority
    setMsgList(msgList.filter(() => true))
  }

  const showBadge = (tag: string) => {
    let show = false
    msgList
      .filter((item) => (tag == 'All' ? true : item.tag == tag))
      .forEach((i) => {
        if (!i.Readed) show = true
      })
    return show
  }

  const tabConfig = [
    {name:"全部消息",tag:'All',icon:<MailOutlined />},
    {name:"我的私信",tag:'Private',icon:<MailOutlined />},
    {name:"课程通知",tag:'Notice',icon:<CommentOutlined />},
    {name:"推广信息",tag:'Broadcast',icon:<ContainerOutlined />},
    {name:"收藏待办",tag:'Favority',icon:<HeartOutlined />},
  ]

  return (
    <>
      <InboxWrapper>
        <Tabs activeKey={chosen} centered onChange={key =>setChosen(key)} >
          {tabConfig.map(i=><TabPane
            tab={<Badge dot={showBadge(i.tag)}>
              {i.icon} {i.name}
            </Badge>}
            key={i.tag}
          />)}
      <GlobalHeader title="消息通知"></GlobalHeader>
      <GlobalRightLayout>
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
          dataSource={msgList.filter((item)=>{switch(chosen) {
            case 'All': return true
            case 'Favority': return item.isFavority
            default: return item.tag == chosen
          }})}
          renderItem={(item) => (
            <List.Item onClick={() => readMsg(item)} >
              <List.Item.Meta
                key={item.msgID}
                avatar={<TeamOutlined />}
                title={<Badge dot={!item.Readed}>{item.from}</Badge>}
                description={<Paragraph ellipsis={true}>{item.pre}</Paragraph>}
              />
              <Button onClick={(e) => favMsg(e,item)}>
                {item.isFavority ? <HeartFilled /> : <HeartOutlined />}
              </Button>
            </List.Item>
            <>
              <List.Item
                onClick={() => readMsg(item)}
                // style={{ display: 'inline-block' }}
              >
                <List.Item.Meta
                  key={item.msgID}
                  avatar={<TeamOutlined />}
                  title={<Badge dot={!item.Readed}>{item.from}</Badge>}
                  description={<Paragraph ellipsis={true}>{item.content}</Paragraph>}
                />
                <Button onClick={() => favMsg(item)}>{item.isFavority ? <HeartFilled /> : <HeartOutlined />}</Button>
              </List.Item>
            </>
          )}
        />
      </GlobalRightLayout>
      <Modal visible={showModal} footer={null} onCancel={() => setShowModal(false)} title={onDisplayMsg?.from}>
        {onDisplayMsg?.content}
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi harum tenetur nobis quae delectus soluta enim
        necessitatibus alias sed possimus aspernatur laboriosam, sunt nisi deleniti accusantium vero quas? Ut, culpa?
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex natus magnam voluptates assumenda id qui, possimus
        cumque eligendi dolorem omnis perspiciatis dolores animi. Voluptatum, facere excepturi. Architecto fugiat
        placeat adipisci!
      </Modal>
      </InboxWrapper>
      <ReadOnlyModal
        visible={showModal}
        close={() => setShowModal(false)}
        title={onDisplayMsg?.from || "无标题"}
        content={onDisplayMsg?.content || " "}
      />
      <ContactModal
        visible={Contact}
        close={() => setContact(false)}
        from="NU"
      />
    </>
  )
}
