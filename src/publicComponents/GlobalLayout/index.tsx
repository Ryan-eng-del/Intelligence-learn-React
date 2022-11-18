import { Avatar } from 'antd'
import { GlobalNav } from 'publicComponents/GlobalNav'
import styled from 'styled-components'

export const GlobalLayout = (props: {
  navItems: any
  routePage: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
}) => {
  return (
    <HomePageWrapper>
      <LeftLayoutWrapper>
        <LogoWrapper>
          <img src={require('assets/img/R.png')} style={{ width: '80%', height: '80%' }} />
        </LogoWrapper>
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
  padding: 30px ;
`

const RightLayoutRouteWrapper = styled.div``
const LogoWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
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
  height: 800px;
  max-width: 1504px;
  min-width: 1200px;
  background-color: white;
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
`

const LeftLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: rgb(245, 245, 245) 2px solid;
  min-width: 100px;
`
const RightLayoutWrapper = styled.div`
  height: 100%;
  flex: 1;
`

const UserAvatarWrapper = styled.div`
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(245, 245, 245);
`
