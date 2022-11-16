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

const ClassInfoNavItems: MenuItem[] = [
  getItem(<Link to={'class'}></Link>, '1', <ProfileOutlined />),
  getItem(<Link to={'chapter'}></Link>, '2', <FundProjectionScreenOutlined />),
  getItem(<Link to={'exam'}></Link>, '3', <BellOutlined />),
  getItem(<Link to={'resource'}></Link>, '4', <FolderOutlined />),
  getItem(<Link to={'discuss'}></Link>, '5', <NotificationOutlined />),
  getItem(<Link to={'questionbank'}></Link>, '6', <CopyOutlined />),
  getItem(<Link to={'knowledge'}></Link>, '7', <GoldOutlined />)
]
export default ClassInfoNavItems
