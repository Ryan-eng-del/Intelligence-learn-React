import styled from 'styled-components'
import {
  LeftSideWrapper,
  LeftInfoWrapper,
  LeftMenuWrapper
} from 'publicComponents/PageStyle/TwoColumnLayout'

export const ClassInfoNavWrapper = styled(LeftSideWrapper)`
  .class-img {

  }
  .class-info-nav-intro {
    padding-top: 12px;
    color: var(--navy);
    font-size: 15px;
    text-align: center;
  }

  .class-img-wapper {
    display:flex;
    font-size: 24px;
    width: 100%;
    justify-content:center;
    transition: transform 300ms;
    transform: translateY(48px);
    &:hover {
      transform: translateY(0px);
    }
  }
  .backButton {
    color: white;
    background-color: var(--blue);
    padding: 5px;
    width: 100%;
    font-size: 24px;
    z-index: -10;
    display: flex;
    justify-content:center;
  }
`
export const ClassInfoWrapper = styled(LeftInfoWrapper)``
export const ClassInfoMenuWrapper = styled(LeftMenuWrapper)``
