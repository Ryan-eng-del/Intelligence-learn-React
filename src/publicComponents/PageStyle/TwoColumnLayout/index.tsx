import styled from 'styled-components'
// 此为左右两侧布局

//整体布局
export const EntireWrapper = styled.div`
  padding: 10px, 30px, 0px 10px;
  min-width: 1080px;
  font-size: 16px;
  letter-spacing: 2px;
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: rgb(24, 144, 255);
  }
`

// 此为左侧整体
export const LeftSideWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border-top: 3px solid var(--border);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  min-height: 460px;
  overflow: hidden;
`

// 此为左侧上半部分
export const LeftInfoWrapper = styled.div`
  display: flex;
  padding: 12px 0px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;

  .username {
    color: black;
    padding-top: 8px;
  }
  animation: 0.7s fadedown ease forwards;
`

// 此为左侧下半部分
export const LeftMenuWrapper = styled.div`
  border-radius: 10px;
  animation: 0.7s fadeup ease forwards;
`

//此为右侧部分
export const RightSideWrapper = styled.div`
  animation: 0.7s fadeleft ease forwards;
  min-height: 460px;
  border-top: 3px solid var(--border);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`
