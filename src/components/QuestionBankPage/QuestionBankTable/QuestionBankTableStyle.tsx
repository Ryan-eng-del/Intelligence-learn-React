import styled from 'styled-components'
export const QuestionBankTableWrapper = styled.div``

export const TotalQuestionWrapper = styled.div`
  margin-left: 30px;
  color: grey;
  .show-details-btn {
    color: blue;
  }
`
export const ShowQuestionDetails = styled.div`
  cursor: pointer;
  width: 82%;
  white-space: nowrap; //内容超宽后禁止换行显示
  overflow: hidden; //超出部分隐藏
  text-overflow: ellipsis; //文字超出部分以省略号显示
`
export const QuestionItemWrapper = styled.div`
  min-height: 32px;
  display: flex;
`
export const QuestionOperateWrapper = styled.div`
  width: 18%;
  /* opacity: 0; */
  margin-left: 10px;
  &:hover {
    opacity: 1;
  }
  .deletebtn {
    color: red;
  }
`
export const QuestionDetailsWrapper = styled.div``
