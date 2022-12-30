import { Avatar, Button } from 'antd'
import { GlobalNav } from 'publicComponents/GlobalNav'
import styled from 'styled-components'
import { IUserInfo } from '../../context/UserInfoContext'
import { IClassInfo } from '../../context/ClassInfoContext'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import AvatarPic from 'assets/img/avatar.jpg'
import classPic from 'assets/img/class.jpg'
import { Suspense } from 'react'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
const protectClassInfoType = (data: IUserInfo | IClassInfo | null, name: 'home' | 'classInfo'): data is IUserInfo =>
  name === 'home'


const GlobalLayout = (props: {
  navItems: any
  routePage: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
  layoutName: 'home' | 'classInfo'
  layoutData: IUserInfo | IClassInfo | null
}) => {
  const { layoutData, layoutName } = props
  const navigate = useNavigate()
  return (
    <HomePageWrapper>
      <LeftLayoutWrapper>
        <Button onClick={()=>navigate('/home')}>返回</Button>
        <NavBottomWrapper>
          {protectClassInfoType(layoutData, layoutName) ? (
            <>
              <UserAvatarWrapper>
                <Avatar src={layoutData?.headPortrait || AvatarPic} size="large" style={{ margin: '0 auto' }} />
              </UserAvatarWrapper>
              <div className={styles['nickname']}>{layoutData?.name || '正在加载中……'}</div>
              <div className={styles['signature']}>
                <span
                  style={{
                    borderBottom: '2px solid black',
                    paddingBottom: '8px'
                  }}
                >
                  {layoutData?.personalSignature || 'Love Yourself'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: '198px', display: 'flex', justifyContent: 'center' }}>
                <img src={classPic} style={{ width: '90%' }} />
              </div>
              <div className={styles['nickname']}>{layoutData?.courseName}</div>
              <div className={styles['signature']}>
                <span
                  style={{
                    borderBottom: '2px solid black',
                    paddingBottom: '8px'
                  }}
                >
                  {layoutData?.courseDescribe || '正在加载中……'}
                </span>
              </div>
            </>
          )}
        </NavBottomWrapper>
        <NavWrapper>
          <GlobalNav
            items={props.navItems}
            sliceCount={props.sliceCount}
            createMapFunction={props.createMapFunction}
          ></GlobalNav>
        </NavWrapper>
      </LeftLayoutWrapper>

      <RightLayoutWrapper>
        <Suspense fallback={<GlobalHeader title="" transparent={true} />}>
          <RightLayoutRouteWrapper>{props.routePage}</RightLayoutRouteWrapper>
        </Suspense>
      </RightLayoutWrapper>
    </HomePageWrapper>
  )
}

export const GlobalRightLayout = styled.div`
  padding: 30px;
  height: 720px;
`

const RightLayoutRouteWrapper = styled.div``

const NavWrapper = styled.div`
  flex: 1;
`

const NavBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`

const HomePageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1504px;
  min-width: 1200px;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: space-between;
`

const LeftLayoutWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border-right: rgb(230, 230, 230) 2px solid;
  width: 200px;
`
const RightLayoutWrapper = styled.div`
  flex: 1;
  height: 100vh;
  min-height: 800px;
`

const UserAvatarWrapper = styled.div`
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(230, 230, 230);
`

export default GlobalLayout
