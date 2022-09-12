import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import {
  UserOutlined,
  LockOutlined,
  MessageOutlined,
  BgColorsOutlined
} from '@ant-design/icons'
import { AccountSecurity } from './AccountSecurity/AccountSecurity'
import { BasicInformation } from './BasicInformation/BasicInformation'
import { Notification } from './Notification/Notification'
import { Personalization } from './Personalization/Personalization'
import { ProfileWapper } from './ProfilePageStyle'

export const ProfilePage: React.FC = () => {
  return (
    <>
      <ProfileWapper>
        <Tabs tabPosition="left" centered>
          <TabPane
            tab={
              <span className="tab-list">
                <UserOutlined />
                基本信息
              </span>
            }
            key="1"
          >
            <BasicInformation></BasicInformation>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <LockOutlined />
                账号安全
              </span>
            }
            key="2"
          >
            <AccountSecurity></AccountSecurity>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <MessageOutlined />
                通知管理
              </span>
            }
            key="3"
          >
            <Notification></Notification>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <BgColorsOutlined />
                个性设置
              </span>
            }
            key="4"
          >
            <Personalization></Personalization>
          </TabPane>
        </Tabs>
      </ProfileWapper>
    </>
  )
}
