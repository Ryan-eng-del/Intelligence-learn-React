import styled from 'styled-components'

export const GlobalRightLayout = styled.div`
  padding: 30px;
  height: 720px;
  overflow-y: auto;
`

export const RightLayoutRouteWrapper = styled.div``

export const NavWrapper = styled.div`
  flex: 1;
`

export const NavBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`

export const HomePageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1504px;
  min-width: 1200px;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .CourseImg {
    width: 198px;
    display: flex;
    justify-content: center;
    img {
      width: 90%;
    }
  }
`

export const LeftLayoutWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border-right: rgb(230, 230, 230) 2px solid;
  width: 200px;
  .signature {
    text-align: center;
    height: 40px;
    span {
      border-bottom: 2px solid black;
      padding-bottom: 8px;
    }
  }

  .nickname {
    text-align: center;
    width: 150px;
    margin: 10px 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 15px;
    overflow: hidden;
    align-items: center;
    line-height: 28px;
    word-break: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .signature span {
    width: 150px;
    display: inline-block;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const RightLayoutWrapper = styled.div`
  flex: 1;
  height: 100vh;
  min-height: 800px;
`

export const UserAvatarWrapper = styled.div`
  .ant-avatar {
    margin: 0 auto;
    transition: all 0.1s;
    &:hover {
      transform: scale(1.1) rotate(30deg);
    }
  }
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(230, 230, 230);
`
