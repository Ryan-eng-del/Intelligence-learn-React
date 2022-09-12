import React from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './StudentClassInfoNavStyle'
import items from './config/index'
import { Menu, Avatar } from 'antd'
import { useLocation } from 'react-router-dom'

export const StudentClassInfoNav: React.FC = () => {
  const location: any = useLocation()
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <Avatar src={require('assets/img/class.jpg')} size={120}></Avatar>
        <div className="class-info-nav-intro">
          <div>{location?.state?.cname}</div>
        </div>
      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <Menu
          defaultSelectedKeys={['studentChapter']}
          defaultOpenKeys={['studentChapter']}
          mode="inline"
          inlineCollapsed={false}
          items={items}
        />
      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
