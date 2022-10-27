import React, { useMemo, useState } from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { useNavigate } from 'react-router-dom'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import { createClassNavMap } from '../../../util/createNavMap'
import { NavMapMenu } from '../../../publicComponents/NavMap/NavMap'

export const ClassInfoNav: React.FC = () => {
  const navigate = useNavigate()
  const [curSelect, setCurSelect] = useState<string>('')
  const map = useMemo(() => createClassNavMap(), [])
  return (
    <ClassInfoNavWrapper>
      <ClassInfoWrapper>
        <CurCourseProvider>
          {({ curCourse }) => (
            <>
              <div
                onClick={() => navigate('/home/teach')}
                className="class-img-wapper"
              >
                <img
                  className="class-img"
                  src={require('assets/img/class.jpg')}
                ></img>
              </div>
              <div
                className="backButton"
                style={{
                  backgroundColor: curCourse.Permission ? 'var(--blue)' : 'red'
                }}
              >
                👈切换课程
              </div>
              <div className="class-info-nav-intro">
                <div>{curCourse.courseName}</div>
              </div>
            </>
          )}
        </CurCourseProvider>
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
