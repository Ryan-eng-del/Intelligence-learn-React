import React from 'react'
import {
  ContainerOutlined,
  BellOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  SettingOutlined
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

const HomeItems: MenuItem[] = [
  getItem(<Link to={'learn'}>我学的课</Link>, '1', <TagOutlined />),
  getItem(<Link to={'teach'}>我教的课</Link>, '2', <TagsOutlined />),
  getItem(<Link to={'inbox'}>消息通知</Link>, '3', <BellOutlined />),
  getItem(<Link to={'exam'}>我的考试</Link>, '4', <ContainerOutlined />),
  getItem(<Link to={'profile'}>社区</Link>, '5', <UserOutlined />),
  getItem(<Link to={'setting'}>设置</Link>, '6', <SettingOutlined />),
]
export default HomeItems
