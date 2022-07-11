import styled, { keyframes } from 'styled-components'
const faderight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
`
export const AvatarWrapper = styled.div`
  position: absolute;
  top: 18px;
  left: 27px;
  animation: 0.5s ${faderight} linear;
`

export const Footer = styled.footer`
  height: 300px;
  clear: both;
  display: flex;
  justify-content: center;
  align-items: end;
  color: var(--lightest-slate);
  font-family: 'en-text-medium';
`
