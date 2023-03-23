import { FormOutlined, WeiboOutlined } from '@ant-design/icons'
import { Col, Row, Statistic } from 'antd'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  padding: 50px 0 50px 50px;

  span.tab-list {
    color: #000;
  }

  .ant-col {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 10px;
    transition: transform 300ms;
    border-radius: 10px;
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
  .color1 {
    padding: unset;
    box-shadow: unset;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);
  }
`
const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <ProfileWrapper>
      <Unaccomplished>此页面无设计 | 无接口</Unaccomplished>
      <Row gutter={17}>
        <Col span={7}>
          <Statistic title="关注" value={3} />
        </Col>
        <Col span={7}>
          <Statistic title="粉丝" value={123} />
        </Col>
        <Col span={7}>
          <Statistic title="笔记" value={123} />
        </Col>
        <Col span={7}>
          <Statistic title="收到点赞" value={325} />
        </Col>
        <Col span={7}>
          <Statistic title="我的收藏" value={65} />
        </Col>
        <Col span={7}>
          <Statistic title="学习时长" value={'1234 分钟'} />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={11} className="color1">
          <Flex onClick={() => navigate('/community')}>
            <FormOutlined />
            &nbsp;&nbsp;前往社区
          </Flex>
        </Col>
        <Col span={11} className="color1" onClick={() => navigate('/')}>
          <Flex>
            <WeiboOutlined />
            &nbsp;&nbsp;系统首页
          </Flex>
        </Col>
      </Row>
    </ProfileWrapper>
  )
}

export default ProfilePage

const Flex = styled.div`
  display: flex;
  height: 10vh;
  font-weight: 800;
  font-size: 24px;
  color: #fff;
  align-items: center;
  justify-content: center;
`
