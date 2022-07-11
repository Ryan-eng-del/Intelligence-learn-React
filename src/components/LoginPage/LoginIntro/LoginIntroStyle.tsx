import styled, { keyframes } from 'styled-components'
const fadeup = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
`
export const LoginPageIntro = styled.div`
  font-size: 30px;

  @media (min-width: 1520px) {
    float: left;
  }
`

export const IntroLineOne = styled.div`
  color: var(--lightest-slate);
  margin-bottom: 8px;

  div.small-intro {
    font-size: 14px;
    color: var(--green);
    font-family: 'en-text-medium';
    opacity: 0;
    animation: 0.7s ${fadeup} var(--easing) forwards;
  }

  div.en-line-two {
    font-size: 32px;
    font-family: 'en-title-medium';
    opacity: 0;
    animation: 0.7s ${fadeup} var(--easing) forwards;
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  @media (min-width: 768px) {
    div.small-intro {
      font-size: 18px;
    }
    div.en-line-two {
      font-size: 36px;
    }
  }
  @media (min-width: 1024px) {
    div.small-intro {
      font-size: 24px;
    }
    div.en-line-two {
      font-size: 42px;
    }
  }
  @media (min-width: 1280px) {
    div.small-intro {
      font-size: 30px;
    }
    div.en-line-two {
      font-size: 48px;
    }
  }
  @media (min-width: 1520px) {
    div.small-intro {
      font-size: 30px;
    }
    div.en-line-two {
      width: 580px;
      word-wrap: break-word;
      font-size: 48px;
    }
  }
`
export const IntroLineTwo = styled.div`
  div.discrete {
    font-size: 32px;
    letter-spacing: 12px;
    font-family: 'zh-medium';
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
    color: var(--lightest-slate);
    opacity: 0;
    animation: 0.7s ${fadeup} var(--easing) forwards;
  }
  div.small-intro {
    font-family: 'zh-light';
    font-size: 15px;
    letter-spacing: 4px;
    color: var(--green);
    opacity: 0;
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
    animation: 0.7s ${fadeup} var(--easing) forwards;
  }
  @media (min-width: 768px) {
    div.small-intro {
      font-size: 19px;
    }
    div.discrete {
      font-size: 36px;
    }
  }
  @media (min-width: 1024px) {
    div.small-intro {
      font-size: 26px;
    }
    div.discrete {
      font-size: 42px;
    }
  }
  @media (min-width: 1280px) {
    div.small-intro {
      font-size: 30px;
    }
    div.discrete {
      font-size: 48px;
    }
  }
`
