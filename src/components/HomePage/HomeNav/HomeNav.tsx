import React, { useState, useMemo } from 'react'
import {
  HomeInfoWrapper,
  HomeMenuWrapper,
  HomeNavWrapper
} from './HomeNavStyle'
import items from './config/index'
import { Avatar } from 'antd'

import { createHomeNavMap } from '../../../util/createNavMap'
import { NavMapMenu } from 'publicComponents/NavMap/NavMap'

export const HomeNav = () => {
  const [curSelect, setCurSelect] = useState<string>('')
  const map = useMemo(() => createHomeNavMap(), [])

  return (
    <HomeNavWrapper>
      <HomeInfoWrapper>
        <Avatar
          className="avatar"
          src={require('assets/img/pyy.png')}
          size={120}
        ></Avatar>
        <div className="username">彭于晏</div>
      </HomeInfoWrapper>
      <HomeMenuWrapper>
        <NavMapMenu
          navMap={map}
          sliceCount={5}
          curSelect={curSelect}
          setCurSelect={setCurSelect}
          items={items}
          defaultOpenKeys={['sub1']}
        />
      </HomeMenuWrapper>
    </HomeNavWrapper>
  )
}
