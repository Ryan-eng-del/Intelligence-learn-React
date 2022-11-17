import styled from 'styled-components'

export const ProfileWapper = styled.div`
  padding: 50px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  span.tab-list {
    color: #000;
  }
  .ant-col {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 10px;
    transition: transform 300ms;
    &:hover {
      transform: scale(1.1, 1.1);
    }
  }
`
