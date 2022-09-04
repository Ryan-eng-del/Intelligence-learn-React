import styled from 'styled-components'
/* LoginFormWrapper */

export const LoginFormWrapper = styled.div`
  margin: 0 auto;
  margin-top: 120px;
  animation: 0.7s fadeleft ease forwards;

  .ant-input-affix-wrapper > input.ant-input {
    padding-left: 12px;
    font-size: 15px;
  }

  div.forget-password {
    margin: 10px 0 15px 0;
    cursor: pointer;
    color: var(--blue);
    text-decoration: underline;
    font-family: 'zh-text';
  }

  float: right;
  margin-top: 0px;
`
export const LoginTitle = styled.div`
  color: var(--blue);
  font-size: 35px;
  text-align: center;
  font-family: 'en-title-medium';

  p.title-login {
    position: relative;
  }

  div.border-login {
    position: absolute;
    left: 50%;
    top: 65px;
    transform: translateX(-20px);
    width: 50px;
    height: 9px;
    border-radius: 12px;
    background-color: var(--blue);
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 16px;

  button {
    height: 42px;
    width: 120px;
    font-size: 17px;
    border-radius: 8px;
  }
`
