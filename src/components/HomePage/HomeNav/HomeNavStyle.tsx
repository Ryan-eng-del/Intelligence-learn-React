import styled from 'styled-components'
import {
  LeftSideWrapper,
  LeftInfoWrapper,
  LeftMenuWrapper
} from 'publicComponents/PageStyle/TwoColumnLayout'

export const HomeNavWrapper = styled(LeftSideWrapper)``
export const HomeInfoWrapper = styled(LeftInfoWrapper)`
  .avater {
    border: 5px solid white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: transform 300ms;
    &:hover {
      transform: scale(1.1,1.1);
    }
  }
`
export const HomeMenuWrapper = styled(LeftMenuWrapper)``
