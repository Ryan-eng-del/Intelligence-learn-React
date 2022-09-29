import React from 'react'
import {
  FolderOutlined,
  FundProjectionScreenOutlined,
  BellOutlined,
  NotificationOutlined,
  GoldOutlined,
  ProfileOutlined
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
  getItem(
    <Link to={'studentchapter'}>课程章节</Link>,
    'studentChapter',
    <FundProjectionScreenOutlined />
  ),
  getItem(
    <Link to={'studentexam'}>作业考试</Link>,
    'studentHomework',
    <BellOutlined />
  ),
  getItem(
    <Link to={'studentresource'}>课程资料</Link>,
    'studentResource',
    <FolderOutlined />
  ),
  getItem(
    <Link to={'studentdiscuss'}>讨论区域</Link>,
    'studentDiscuss',
    <NotificationOutlined />
  ),
  getItem(
    <Link to={'studentknowledge'}>知识点</Link>,
    'studentKnowledge',
    <GoldOutlined />
  )
]
export default items
