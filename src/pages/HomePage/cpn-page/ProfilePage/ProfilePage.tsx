import { FormOutlined, WeiboOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic } from 'antd';
import React from 'react';
import { ProfileWapper } from './ProfilePageStyle';

export const ProfilePage: React.FC = () => {

  return (
    <ProfileWapper>
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
        <Statistic title="学习时长" value={"1234 分钟"} />
      </Col>
    </Row>
    <Row gutter={[12,12]}>
      <Col span={11}>
        <h1 style={{padding:"10%", }}><FormOutlined />&nbsp;&nbsp;写个笔记</h1>
      </Col>
      <Col span={11}>
        <h1 style={{padding:"10%"}}><WeiboOutlined />&nbsp;&nbsp;看看你的</h1>
      </Col>
    </Row>
  </ProfileWapper>
  );
};
