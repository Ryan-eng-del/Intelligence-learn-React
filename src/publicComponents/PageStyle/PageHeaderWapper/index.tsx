import styled from 'styled-components'
export const PageWrapper = styled.div`
  color: white;
  font-size: 18px;
  padding: 10px 20px;
`
export const HeaderWrapper = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  .add-button {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--blue);
  div.page-title {
    border-left: 5px solid var(--blue);
    line-height: 40px;
    padding-left: 10px;
  }
  padding-bottom: 10px;
`
export const ContentWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
`
