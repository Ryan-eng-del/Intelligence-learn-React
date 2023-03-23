import { Modal } from 'antd'
import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const RequireLogin: React.FC<{
  open: boolean
  close: () => void
}> = ({ open, close }) => {
  const navigate = useNavigate()
  return (
    <Modal
      zIndex={200}
      title=""
      open={open}
      onOk={close}
      onCancel={close}
      modalRender={(modal) => <div>{modal}</div>}
      footer={[]}
      closable={false}
    >
      <Wapper>
        <b>你现在还没有登录</b>
        <br />
        登录立即享受
        <br />
        + 在平台上自由创建课程
        <br />
        + 大数据引导学习
        <br />
        + 体验智能阅卷系统
        <br />
        <PrimaryButton
          title="立即登录"
          handleClick={() => {
            navigate('/login')
            close()
          }}
        />
      </Wapper>
    </Modal>
  )
}

const Wapper = styled.div`
  user-select: none;
  .info {
    position: fixed;
  }
  .ava {
    transform: translateY(32px) translateX(30px);
  }
  .name {
    font-size: 48px;
    transform: translateY(-72px) translateX(180px);
    font-weight: bold;
    color: #fff;
    mix-blend-mode: difference;
  }
  .img {
    width: 100%;
    -webkit-user-drag: none;
  }
  .imgWapper {
    height: 128px;
    overflow: hidden;
  }
  .infoText {
    margin-left: 20px;
    margin-top: 40px;
    .gray {
      color: #999;
    }
  }
  .action {
    & > div {
      cursor: pointer;
    }
    font-size: 24px;
  }
`
