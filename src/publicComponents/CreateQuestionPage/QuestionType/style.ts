import styled from 'styled-components'

export const QuestionWapper = styled.div`
  font-size: 20px;
  vertical-align: text-bottom;
  /* background-color: #eee; */
  /* padding: 5px; */
`

export const FooterWapper = styled.div`
  /* display: grid; */
  div {
    margin: 10px;
    margin-left: 0px;
  }
  grid-template-areas:
    'E E E E E R'
    'E E E E E P';
  .d {
    grid-area: E;
  }
  .p {
    grid-area: P;
  }
  .r {
    grid-area: R;
  }
`
