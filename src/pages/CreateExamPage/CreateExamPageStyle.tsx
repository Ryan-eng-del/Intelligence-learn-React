import styled from 'styled-components'

export const CreateExamCommon = styled.div`
  background-color: white;
  border-radius: 8px;
`

export const CreateExamPageWrapper = styled.div`
  position: relative;
  background: rgb(242, 244, 247);
`

export const CreateExamCenterWrapper = styled.div`
  padding: 8px 15px 0 15px;
  margin: 0 auto;
  width: 1200px;
  border-radius: 8px;
  background: rgb(242, 244, 247);
`
export const CreateExamBodyWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  height: 824px;
`

export const CreateExamBodyRightWrapper = styled.div``
export const CreateExamBodyLeftWrapper = styled(CreateExamCommon)`
  width: 280px;
  height: 731px;
  margin-right: 12px;
  overflow: auto;
  color: #646873;
`
export const CreateExamNavWrapper = styled(CreateExamCommon)`
  display: flex;
  justify-items: center;
  padding: 18px 30px;
  margin-bottom: 20px;
  width: 879px;
  box-shadow: 0px 2px 10px 0px rgb(237 238 240 / 50%);
`
export const CreateExamQuestion = styled(CreateExamCommon)`
  height: 644px;
  overflow: auto;
`
