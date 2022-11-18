import React from 'react'
import { ContainerOutlined, BellOutlined, TagOutlined, TagsOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
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

const HomeItems: MenuItem[] = [
  getItem(<Link to={'learn'} />, '1', <TagOutlined />),
  getItem(<Link to={'teach'} />, '2', <TagsOutlined />),
  getItem(<Link to={'inbox'} />, '3', <BellOutlined />),
  getItem(<Link to={'exam'} />, '4', <ContainerOutlined />),
  getItem(<Link to={'profile'} />, '5', <UserOutlined />),
  getItem(<Link to={'setting'} />, '0', <SettingOutlined />),
]
export default HomeItems
