import styled, { keyframes } from 'styled-components'
export const LoginPageWrapper = styled.div`
  @media (min-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (min-width: 1024px) {
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
  }
  @media (min-width: 1280px) {
    padding-top: 80px;
    padding-left: 80px;
    padding-right: 80px;
  }
  @media (min-width: 1520px) {
    margin: 0 auto;
    width: 1261px;
    padding-top: 110px;
    padding-left: 0;
    padding-right: 0;
  }
`
const faderight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
`
export const AvatarWrapper = styled.div`
  top: 18px;
  left: 27px;
  animation: 0.5s ${faderight} linear;
`
