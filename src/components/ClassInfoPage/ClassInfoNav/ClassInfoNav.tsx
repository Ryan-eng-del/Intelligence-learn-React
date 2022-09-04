import React from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { Menu } from 'antd'
import { useLocation } from 'react-router-dom'

export const ClassInfoNav: React.FC = () => {
  const location: any = useLocation()
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <img className="class-img" src={require('assets/img/class.jpg')} ></img>
        <div className="class-info-nav-intro">
          <div>{location?.state?.cname}</div>
        </div>
      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <Menu
          defaultSelectedKeys={['Chapter']}
          defaultOpenKeys={['Chapter']}
          mode="inline"
          inlineCollapsed={false}
          items={items}
        />
      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
