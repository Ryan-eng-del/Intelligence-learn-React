import { Button, Form, Input, Modal } from 'antd'
import { useUserInfo } from 'context/UserInfoContext'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export const AccountSecurity = () => {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
  const [modal, setModal] = useState({
    password: false,
    email: false,
    mobile: false
  })

  const update = async () => {
    // await mutateAsync()
    navigate(0)
  }
  const close = (prop: keyof typeof modal) => () => {
    setModal({ ...modal, [prop]: false })
  }
  return (
    <>
      {/***********************************/}
      <Modal title="更改密码" open={modal.password} onCancel={close('password')}>
        <Unaccomplished>没有接口</Unaccomplished>
        请输入旧密码：
        <Input placeholder="旧密码" />
        请输入新密码：
        <Input placeholder="新密码" />
        再次确认新密码：
        <Input placeholder="新密码" />
      </Modal>
      {/***********************************/}
      <Modal title="更改邮箱" open={modal.email} onCancel={close('email')}>
        <Unaccomplished>没接接口</Unaccomplished>
        输入新邮箱：
        <Input placeholder="邮箱" />
        验证码：
        <Input placeholder="验证码" />
        <Button>获取验证码</Button>
      </Modal>
      {/***********************************/}
      <Modal title="更改手机号" open={modal.mobile} onCancel={close('mobile')}>
        <Unaccomplished>没接接口</Unaccomplished>
        <Button>通过旧手机获取验证码</Button>
        <Input placeholder="验证码" />
        <Input placeholder="新手机号" />
      </Modal>
      {/***********************************/}
      <Form>
        <Form.Item label="密码">
          已设置&nbsp;&nbsp;
          <Button onClick={() => setModal({ ...modal, password: true })}>修改密码</Button>
        </Form.Item>
        <Form.Item label="邮箱">
          {userInfo?.email || '未绑定'}&nbsp;&nbsp;
          <Button onClick={() => setModal({ ...modal, email: true })}>更改绑定邮箱</Button>
        </Form.Item>
        <Form.Item label="手机">
          {userInfo?.mobile || '未绑定'}&nbsp;&nbsp;
          <Button onClick={() => setModal({ ...modal, mobile: true })}>更改手机号</Button>
        </Form.Item>
      </Form>
      <Unaccomplished>无接口</Unaccomplished>
      <Button danger>注销账号</Button>&nbsp;&nbsp;
      <a>用户协议</a>
    </>
  )
}
