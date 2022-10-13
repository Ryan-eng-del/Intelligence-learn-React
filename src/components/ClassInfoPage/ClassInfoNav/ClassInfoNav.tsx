import React, { useMemo, useState } from 'react'
import {
  ClassInfoWrapper,
  ClassInfoMenuWrapper,
  ClassInfoNavWrapper
} from './ClassInfoNavStyle'
import items from './config/index'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import { createClassNavMap } from '../../../util/createNavMap'

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
                <div>{curCourse.className}</div>
              </div>
            </>
          )}
        </CurCourseProvider>
      </ClassInfoWrapper>
      <ClassInfoMenuWrapper>
        <Menu
          defaultSelectedKeys={['Chapter']}
          defaultOpenKeys={['Chapter']}
          mode="inline"
          inlineCollapsed={false}
          items={items}
        />
      </ClassInfoMenuWrapper>
    </ClassInfoNavWrapper>
  )
}
