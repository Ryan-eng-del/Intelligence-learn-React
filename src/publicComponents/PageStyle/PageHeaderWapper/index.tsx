import styled from 'styled-components'
export const PageWrapper = styled.div`
  color: white;
  font-size: 18px;
  padding: 10px 20px;
`
export const HeaderWrapper = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
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
