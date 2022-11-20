import { Avatar } from 'antd'
import { GlobalNav } from 'publicComponents/GlobalNav'
import styled from 'styled-components'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'

export const GlobalLayout = (props: {
  navItems: any
  routePage: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
  logoWrapper: (param: any) => JSX.Element
}) => {
  const { classInfo } = useCurrentClassInfo()
  return (
    <HomePageWrapper>
      <LeftLayoutWrapper>
        {/* 等后端接口 获取单门课程详情 */}
        {props.logoWrapper((classInfo && classInfo.courseName) || '离散数学')}
        <LogoWrapper></LogoWrapper>
        <NavWrapper>
          <GlobalNav
            items={props.navItems}
            sliceCount={props.sliceCount}
            createMapFunction={props.createMapFunction}
          ></GlobalNav>
        </NavWrapper>
        <NavBottomWrapper>
          <UserAvatarWrapper>
            <Avatar src={require('assets/img/OIP.jpg')} size="large" style={{ margin: '0 auto' }} />
          </UserAvatarWrapper>
        </NavBottomWrapper>
      </LeftLayoutWrapper>
      <RightLayoutWrapper>
        <RightLayoutRouteWrapper>{props.routePage}</RightLayoutRouteWrapper>
      </RightLayoutWrapper>
    </HomePageWrapper>
  )
}

export const GlobalRightLayout = styled.div`
  padding: 30px;
`

const RightLayoutRouteWrapper = styled.div``
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 80%;
    height: 80%;
  }
`
const NavWrapper = styled.div`
  flex: 1;
`

const NavBottomWrapper = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HomePageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1504px;
  min-width: 1200px;
  overflow: scroll;
  height: 750px;
  background-color: white;
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
`

const LeftLayoutWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: rgb(245, 245, 245) 2px solid;
  min-width: 200px;
  //width: 200px;
`
const RightLayoutWrapper = styled.div`
  //height: 100%;
  flex: 1;
`

const UserAvatarWrapper = styled.div`
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(245, 245, 245);
`
