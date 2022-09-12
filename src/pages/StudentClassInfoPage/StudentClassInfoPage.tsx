import React from 'react'
import { StudentClassInfoPageWrapper } from './StudentClassInfoPageStyle'

import {
  StudentClassInfoNav,
  StudentClassInfoRoutePage
} from 'components/StudentClassInfoPage'
import { LayoutCpn } from 'publicComponents/LayoutCpn/LayoutCpn'

export const StudentClassInfoPage = () => {
  return (
    <>
      <StudentClassInfoPageWrapper>
        <LayoutCpn
          layoutLeft={StudentClassInfoNav}
          layoutRight={StudentClassInfoRoutePage}
        />
      </StudentClassInfoPageWrapper>
    </>
  )
}
