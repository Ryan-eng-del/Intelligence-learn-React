import styled, { keyframes } from 'styled-components'

export const LoginPageWrapper = styled.div`
  margin: 0 auto;
  width: 1261px;
  min-width: 1261px;
  padding-top: 110px;
  height: 100vh;
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
