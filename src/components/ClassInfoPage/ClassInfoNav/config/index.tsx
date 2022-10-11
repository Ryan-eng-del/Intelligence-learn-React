import React from 'react'
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

const items: MenuItem[] = [
  getItem(<Link to={'class'}>课程班级</Link>, '1', <ProfileOutlined />),
  getItem(
    <Link to={'chapter'}>课程章节</Link>,
    '2',
    <FundProjectionScreenOutlined />
  ),
  getItem(<Link to={'exam'}>作业考试</Link>, '3', <BellOutlined />),
  getItem(<Link to={'resource'}>课程资料</Link>, '4', <FolderOutlined />),
  getItem(<Link to={'discuss'}>讨论区域</Link>, '5', <NotificationOutlined />),
  getItem(<Link to={'/questionbank'}>题库</Link>, '6', <CopyOutlined />),
  getItem(<Link to={'knowledge'}>知识点</Link>, '7', <GoldOutlined />)
]
export default items
