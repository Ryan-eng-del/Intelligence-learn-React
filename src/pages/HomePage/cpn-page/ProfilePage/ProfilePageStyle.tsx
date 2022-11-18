import styled from 'styled-components'

export const ProfileWapper = styled.div`
  padding: 50px;
  background-color: #fff;

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
