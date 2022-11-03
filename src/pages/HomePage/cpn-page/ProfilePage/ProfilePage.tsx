import { FormOutlined, WeiboOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Statistic } from 'antd';
import React, { useState } from 'react';
import { ProfileWapper } from './ProfilePageStyle';
import { Follower as FollowerPanal } from './Follower';
import { Following as FollowingPanal } from './Following';
export const ProfilePage: React.FC = () => {

  const [Following, setFollowing] = useState(false);
  const [Follower, setFollower] = useState(false);
  const showFollower = () => {
    setFollower(true);
  };
  const showFollowing = () => {
    setFollowing(true);
  };
  const handleCancel = () => {
    setFollowing(false);
    setFollower(false);
  };

  return (
    <ProfileWapper>
      <Row gutter={17}>
      <Col span={7}>
        <div onClick={showFollowing}>
          <Statistic title="关注" value={3} />
        </div>
      </Col>
      <Col span={7}>
        <div onClick={showFollower}>
          <Statistic title="粉丝" value={123} />
        </div>
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
    <Modal title="关注列表" visible={Following} onOk={handleCancel} onCancel={handleCancel}>
      <FollowingPanal />
    </Modal>
    <Modal title="粉丝列表" visible={Follower} onOk={handleCancel} onCancel={handleCancel}>
      <FollowerPanal />
    </Modal>
  </ProfileWapper>
  );
};
