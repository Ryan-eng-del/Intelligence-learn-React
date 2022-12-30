import { Menu } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface NavMapProps extends React.ComponentProps<typeof Menu> {
  items: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
}

export const GlobalNav = (props: NavMapProps) => {
  const [curSelect, setCurSelect] = useState<string>('')
  const { pathname } = useLocation()

  const map = useMemo(() => props.createMapFunction(), [])
  useEffect(() => setCurSelect(map.get(pathname.slice(props.sliceCount))!), [props.sliceCount])
  const handleOnSelect = (selectInfo: any) => setCurSelect(selectInfo.key)
  console.log(map, props.sliceCount, 'nav', map.get(pathname.slice(props.sliceCount))!)
  return (
    <Menu   
      mode="inline"
      inlineCollapsed={false}
      items={props.items}
      selectedKeys={[curSelect]}
      onSelect={handleOnSelect}
    />
  )
}
