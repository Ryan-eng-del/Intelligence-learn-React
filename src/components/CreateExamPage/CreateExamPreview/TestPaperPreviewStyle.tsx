import styled from 'styled-components'

export const TestPaperPreviewWrapper = styled.div`
  min-width: 800px;
  background-color: #fff;
  /* border-top: 10px solid rgb(22, 119, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px; */
  margin: 50px;
  margin-top: 10px;
  padding: 40px;
  margin-bottom: 100px;
`

export const TitleWrapper = styled.div`
  margin: 10px;
  text-align: center;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  .paperName {
    font-size: 48px;
    font-weight: bold;
  }
`

export const ItemWrapper = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
  margin: 10px;
  padding: 10px;
`
