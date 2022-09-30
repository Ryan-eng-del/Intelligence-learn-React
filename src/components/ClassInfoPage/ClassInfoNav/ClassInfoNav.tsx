import React from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'

import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import {
  FolderOutlined,
  FundProjectionScreenOutlined,
  BellOutlined,
  NotificationOutlined,
  GoldOutlined,
  ProfileOutlined,
  CopyOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items = (Permission:boolean) => {
  const a:MenuItem[] =[
    getItem(
      <Link to={'chapter'}>课程章节</Link>,
      'Chapter',
      <FundProjectionScreenOutlined />
    ),
    getItem(<Link to={'exam'}>作业考试</Link>, 'Homework', <BellOutlined />),
    getItem(
      <Link to={'resource'}>课程资料</Link>,
      'Resource',
      <FolderOutlined />
    ),
    getItem(
      <Link to={'discuss'}>讨论区域</Link>,
      'Discuss',
      <NotificationOutlined />
    ),
    getItem(
      <Link to={'questionbank'}>题库</Link>,
      'QuestionBank',
      <CopyOutlined />
    ),
    getItem(<Link to={'knowledge'}>知识点</Link>, 'Knowledge', <GoldOutlined />)
  ]
  if(Permission) {
    a.unshift(getItem(<Link to={'class'}>课程班级</Link>, 'class', <ProfileOutlined />))
  }
  return a;
}

export const ClassInfoNav: React.FC = () => {
  const navigate = useNavigate()
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <CurCourseProvider>{
          ({curCourse})=><>
            <div
              onClick={() => navigate('/home/teach')}
              className="class-img-wapper"
            >
              <img
                className="class-img"
                src={require('assets/img/class.jpg')}
              ></img>
            </div>
            <div
              className="backButton"
              style={{backgroundColor:curCourse.Permission? "var(--blue)": "red"}}
            >👈切换课程</div>
            <div className="class-info-nav-intro">
              <div>{curCourse.className}</div>
            </div>
          </>
        }</CurCourseProvider>

      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <CurCourseProvider>
          {
            ({curCourse})=><Menu
            defaultSelectedKeys={['Chapter']}
            defaultOpenKeys={['Chapter']}
            mode="inline"
            inlineCollapsed={false}
            items={items(curCourse.Permission)}
          />
          }
        </CurCourseProvider>

      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
