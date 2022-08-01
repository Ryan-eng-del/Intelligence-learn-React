import React from 'react'
import { HomePageWrapper } from './HomePageStyle'
import { HomeNav, HomeRoutePage } from 'components/HomePage'
import { LayoutCpn } from 'publicComponents/LayoutCpn/LayoutCpn'

export const HomePage = () => {
  return (
    <HomePageWrapper>
      <LayoutCpn layoutLeft={HomeNav} layoutRight={HomeRoutePage} />
    </HomePageWrapper>
  )
}
