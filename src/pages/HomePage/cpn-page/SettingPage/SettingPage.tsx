import { Tabs } from 'antd'
import React from 'react'

import { BgColorsOutlined, LockOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { useNavigate } from 'react-router-dom'
import LocalCache from 'util/cache'
import { TOKEN_NAME } from '../../../../global/varible'
import { PrimaryButton } from '../../../../publicComponents/Button/index'
import { AccountSecurity } from './AccountSecurity/AccountSecurity'
import { BasicInformation } from './BasicInformation/BasicInformation'
import { Notification } from './Notification/Notification'
import { Personalization } from './Personalization/Personalization'
import { ProfileWapper } from './SettingPageStyle'

const { TabPane } = Tabs

const SettingPage: React.FC = () => {
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    LocalCache.deleteCache(TOKEN_NAME)
  }
  const item = (Icon: any, Text: any) => (
    <span className="tab-list">
      <Icon />
      {Text}
    </span>
  )
  return (
    <>
      <GlobalHeader
        title="设置"
        tool={<PrimaryButton title="退出登录" handleClick={logout}></PrimaryButton>}
      ></GlobalHeader>
      <ProfileWapper>
        <Tabs
          tabPosition="left"
          centered
          items={[
            {
              key: '1',
              label: item(UserOutlined, '基本信息'),
              children: <BasicInformation />
            },

            {
              key: '2',
              label: item(LockOutlined, '账号安全'),
              children: <AccountSecurity />
            },

            {
              key: '3',
              label: item(MessageOutlined, '通知管理'),
              children: <Notification />
            },
            {
              key: '4',
              label: item(BgColorsOutlined, '个性设置'),
              children: <Personalization />
            }
          ]}
        ></Tabs>
      </ProfileWapper>
    </>
  )
}

export default SettingPage
