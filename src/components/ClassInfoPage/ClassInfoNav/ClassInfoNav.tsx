import React from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

export const ClassInfoNav: React.FC = () => {
  const location: any = useLocation()
  const navigate = useNavigate()
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <div onClick={()=>navigate('/home/class/teach')} className="class-img-wapper">
          <img className="class-img" src={require('assets/img/class.jpg')} ></img>
        </div>
        <div className="backButton">👈切换课程</div>
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
