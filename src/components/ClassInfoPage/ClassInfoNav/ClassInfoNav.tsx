import React from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { Menu, Avatar } from 'antd'

export const ClassInfoNav: React.FC = () => {
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <Avatar src={require('assets/img/class.jpg')} size={120}></Avatar>
        <div className="class-info-nav-intro">
          <div>课程名称</div>
        </div>
      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <Menu
          defaultSelectedKeys={['Chapter']}
          defaultOpenKeys={['Chapter']}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          items={items}
        />
      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
