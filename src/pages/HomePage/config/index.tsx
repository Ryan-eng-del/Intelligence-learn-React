import React from 'react'
import { ContainerOutlined, BellOutlined, TagOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons'
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
  getItem(<Link to={'learn'}></Link>, '1', <TagOutlined />),
  getItem(<Link to={'teach'}></Link>, '2', <TagsOutlined />),
  getItem(<Link to={'inbox'}></Link>, '3', <BellOutlined />),
  getItem(<Link to={'exam'}></Link>, '4', <ContainerOutlined />),
  getItem(<Link to={'profile'}></Link>, '5', <UserOutlined />)
]
export default HomeItems
