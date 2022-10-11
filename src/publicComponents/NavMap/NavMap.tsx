import React, { Dispatch, SetStateAction } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'rc-menu/lib/Menu'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type NavOmitMenu = 'items' | 'selectedKeys' | 'defaultOpenKeys'

interface NavMapProps extends Pick<MenuProps, NavOmitMenu> {
  navMap: Map<string, string>
  curSelect: string
  setCurSelect: Dispatch<SetStateAction<string>>
  sliceCount: number
}

export const NavMapMenu = ({
  navMap,
  setCurSelect,
  curSelect,
  items,
  sliceCount
}: NavMapProps) => {
  const { pathname } = useLocation()
  console.log(navMap.get(pathname.slice(sliceCount)))

  useEffect(() => setCurSelect(navMap.get(pathname.slice(sliceCount))!), [])
  const handleOnSelect = (selectInfo: any) => setCurSelect(selectInfo.key)
  return (
    <Menu
      mode="inline"
      inlineCollapsed={false}
      defaultOpenKeys={['sub1']}
      items={items}
      selectedKeys={[curSelect]}
      onSelect={handleOnSelect}
    />
  )
}
