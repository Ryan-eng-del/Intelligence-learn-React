import { FormOutlined, WeiboOutlined } from '@ant-design/icons'
import { Col, Row, Statistic } from 'antd'
import React from 'react'
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

    &:hover {
      transform: scale(1.1, 1.1);
    }
  }
`
export const ProfilePage: React.FC = () => {
  return (
    <ProfileWrapper>
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
        <Col span={11}>
          <h1 style={{ padding: '10%' }}>
            <FormOutlined />
            &nbsp;&nbsp;写个笔记
          </h1>
        </Col>
        <Col span={11}>
          <h1 style={{ padding: '10%' }}>
            <WeiboOutlined />
            &nbsp;&nbsp;看看你的
          </h1>
        </Col>
      </Row>
    </ProfileWrapper>
  )
}
