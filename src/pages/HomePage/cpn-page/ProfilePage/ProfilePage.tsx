import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import {
  UserOutlined,
  LockOutlined,
  MessageOutlined,
  BgColorsOutlined
} from '@ant-design/icons'


export const ProfilePage: React.FC = () => {
  return (
    <>
      <Tabs tabPosition='left' centered>
        <TabPane tab={<span><UserOutlined />基本信息</span>} key="1">
          头像<br/>名字<br/>性别<br/>学校<br/>部门<br/>
        </TabPane>
        <TabPane tab={<span><LockOutlined />账号安全</span>} key="2">
          密码<br/>绑定手机<br/>绑定邮箱<br/>
        </TabPane>
        <TabPane tab={<span><MessageOutlined />通知管理</span>} key="3">
          不提示推广消息<br/>
        </TabPane>
        <TabPane tab={<span><BgColorsOutlined />个性设置</span>} key="4">
          主题色<br/>
        </TabPane>
      </Tabs>
    </>
  )
}
