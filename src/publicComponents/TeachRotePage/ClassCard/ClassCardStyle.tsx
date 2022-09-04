import styled from 'styled-components'
export const CardWrapper = styled.div`
  /* background-color: var(--navy); */
  width: 200px;
  color: var(--navy);
  height: 250px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 300ms;
  &:hover {
    transform: translateY(-6px);
  }
`
export const CardHeadWrapper = styled.div`
  height: 150px;
  margin: 0 auto;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
    height: 100%;
    transition: transform 500ms;
    &:hover {
      transform: scale(1.2);
    }
  }
`
export const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  .ant-btn-primary {
    height: 30px;
    border-color: transparent;
  }
  .tname {
    font-size: 17px;
    margin-bottom: 5px;
  }
`