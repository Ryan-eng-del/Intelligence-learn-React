import React from 'react'
import { ChapterInfoWrapper } from './ChapterInfoStyle'
import {
  ChapterInfoNav,
  ChapterInfoSwitchMode
} from 'components/ChapterInfoPage'
import { LayoutCpn } from 'publicComponents/LayoutCpn/LayoutCpn'

export const ChapterInfo: React.FC = () => {
  return (
    <>
      <ChapterInfoWrapper>
        <LayoutCpn
          layoutLeft={ChapterInfoNav}
          layoutRight={ChapterInfoSwitchMode}
        />
      </ChapterInfoWrapper>
    </>
  )
}
