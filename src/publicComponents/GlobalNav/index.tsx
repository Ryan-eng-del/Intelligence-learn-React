import { NavMapMenu } from 'publicComponents/NavMap/NavMap'
import { useMemo, useState } from 'react'
import { createHomeNavMap } from 'util/createNavMap'

export const GlobalNav = (props: { items: any }) => {
  const [curSelect, setCurSelect] = useState<string>('')
  const map = useMemo(() => createHomeNavMap(), [])
  return (
    <div>
      <div>
        <NavMapMenu
          navMap={map}
          sliceCount={5}
          curSelect={curSelect}
          setCurSelect={setCurSelect}
          items={props.items}
          defaultOpenKeys={['sub1']}
        />
      </div>
    </div>
  )
}
