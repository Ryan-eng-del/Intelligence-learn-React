import styled from 'styled-components'
/* LoginFormWrapper */

export const LoginFormWrapper = styled.div`
  background: #f2f6fc;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--blue);
  }

  .input {
    width: 260px;
    height: 44px;
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s, color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
      background-color 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
  }

  .label {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--blue);
    transition: color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
  }

  .input:hover,
  .input:focus,
  .input-group:hover .input {
    outline: none;
    border-color: var(--blue);
  }

  .input-group:hover .label,
  .input:focus {
    color: var(--blue);
  }

  div.forget-password {
    margin: 10px 0 15px 0;
    cursor: pointer;
    color: var(--blue);
    text-decoration: underline;
    font-family: 'zh-text';
  }

  .btn {
    width: 260px;
    height: 45px;
    margin: 5px 2px;
    background: #ffffff;
    color: var(--blue);
    border: none;
    border-radius: 0.625em;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  button:hover {
    color: #ffffff;
  }

  button:after {
    content: '';
    background: var(--blue);
    position: absolute;
    z-index: -1;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
    transition: all 0.5s;
  }

  button:hover:after {
    transform: skewX(-45deg) scale(1, 1);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
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
