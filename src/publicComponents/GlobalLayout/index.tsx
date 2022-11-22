import { Avatar } from 'antd'
import { GlobalNav } from 'publicComponents/GlobalNav'
import styled from 'styled-components'
import { IUserInfo } from '../../context/UserInfoContext'
import { IClassInfo } from '../../context/ClassInfoContext'
import styles from './index.module.css'

const protectClassInfoType = (data: IUserInfo | IClassInfo | null, name: 'home' | 'classInfo'): data is IUserInfo =>
  name === 'home'

export const GlobalLayout = (props: {
  navItems: any
  routePage: any
  sliceCount: number
  createMapFunction: () => Map<string, string>
  layoutName: 'home' | 'classInfo'
  layoutData: IUserInfo | IClassInfo | null
}) => {
  const { layoutData, layoutName } = props
  return (
    <HomePageWrapper>
      <LeftLayoutWrapper>
        <NavBottomWrapper>
          {protectClassInfoType(layoutData, layoutName) ? (
            <>
              <UserAvatarWrapper>
                <Avatar
                  src={layoutData?.headPortrait || require('assets/img/OIP.jpg')}
                  size="large"
                  style={{ margin: '0 auto' }}
                />
              </UserAvatarWrapper>
              <div className={styles['nickname']}>{layoutData?.name || '游客'}</div>
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
                <img src={require('assets/img/class.jpg')} style={{ width: '90%' }} />
              </div>
              <div className={styles['nickname']}>{layoutData?.courseName}</div>
              <div className={styles['signature']}>
                <span
                  style={{
                    borderBottom: '2px solid black',
                    paddingBottom: '8px'
                  }}
                >
                  {layoutData?.courseDescribe || '课程暂无描述'}
                </span>
              </div>
              <div></div>
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
        <RightLayoutRouteWrapper>{props.routePage}</RightLayoutRouteWrapper>
      </RightLayoutWrapper>
    </HomePageWrapper>
  )
}

export const GlobalRightLayout = styled.div`
  padding: 30px;
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
  position: relative;
`

const LeftLayoutWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border-right: rgb(230, 230, 230) 2px solid;
  width: 200px;
  position: sticky;
  top: 0;
`
const RightLayoutWrapper = styled.div`
  flex: 1;
`

const UserAvatarWrapper = styled.div`
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgb(230, 230, 230);
`
