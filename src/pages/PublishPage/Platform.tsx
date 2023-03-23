import { UserOutlined } from '@ant-design/icons'
import { Avatar, Input, Layout, Menu } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { useUserInfo } from 'context/UserInfoContext'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const { Search } = Input

export const Platform = () => {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
  return (
    <Layout>
      <Header>
        <Flex>
          <Title onClick={() => navigate('/')}>在线智能导学平台</Title>
          <MenuWapper>
            <Menu
              style={{ minWidth: 0, flex: 'auto' }}
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={[
                { key: '', label: '课程' },
                { key: 'school', label: '学校' },
                { key: 'about', label: '平台优势' }
              ]}
              onClick={(e) => navigate(`/${e.key}`)}
            />
          </MenuWapper>
        </Flex>
        <Flex>
          <InputWapper>
            <Search placeholder="搜索课程" onSearch={(v) => console.log(v)} enterButton />
          </InputWapper>
          <UserWapper>
            {userInfo ? (
              <div onClick={() => navigate('/home/teach')} style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ margin: '0 12px' }}>{userInfo.name}</span>
              </div>
            ) : (
              <>
                <a onClick={() => navigate('/login')}>登录 </a> | <a onClick={() => navigate('/register')}> 注册</a>
              </>
            )}
          </UserWapper>
        </Flex>
      </Header>

      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 380, background: '#fff' }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <a href="http://learniq.cn">@ learniq.cn</a>
      </Footer>
    </Layout>
  )
}

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #112240;
  align-items: center;
  justify-content: space-between;
`

const InputWapper = styled.div``
const MenuWapper = styled.div`
  width: 500px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const UserWapper = styled.div`
  margin: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`

const Title = styled.div`
  height: 31px;
  margin: 0 24px 0 16px;
  color: #fff;
  font-weight: 800;
  font-size: 24px;
`
