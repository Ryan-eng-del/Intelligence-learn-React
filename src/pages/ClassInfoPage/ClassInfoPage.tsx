import React from 'react'
import { ClassInfoPageWrapper } from './ClassInfoPageStyle'

import { ClassInfoNav, ClassInfoRoutePage } from 'components/ClassInfoPage'
import { LayoutCpn } from 'publicComponents/LayoutCpn/LayoutCpn'

export const ClassInfoPage = () => {
  return (
    <>
      <ClassInfoPageWrapper>
        <LayoutCpn layoutLeft={ClassInfoNav} layoutRight={ClassInfoRoutePage} />
      </ClassInfoPageWrapper>
    </>
  )
}
