import React, { useMemo, useState } from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavMapMenu } from '../../../publicComponents/NavMap/NavMap'
import { createClassNavMap } from '../../../util/createNavMap'

export const ClassInfoNav: React.FC = () => {
  const location: any = useLocation()
  const navigate = useNavigate()
  const [curSelect, setCurSelect] = useState<string>('')
  const map = useMemo(() => createClassNavMap(), [])
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <div
          onClick={() => navigate('/home/class/teach')}
          className="class-img-wapper"
        >
          <img
            className="class-img"
            src={require('assets/img/class.jpg')}
          ></img>
        </div>
        <div className="backButton">👈切换课程</div>
        <div className="class-info-nav-intro">
          <div>{location?.state?.cname}</div>
        </div>
      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <NavMapMenu
          sliceCount={10}
          items={items}
          curSelect={curSelect}
          setCurSelect={setCurSelect}
          navMap={map}
        />
      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
