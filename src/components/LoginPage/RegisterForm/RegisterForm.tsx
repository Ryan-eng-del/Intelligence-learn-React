import React, { useState } from 'react'
import { Input, Button, message, AutoComplete } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  VerifiedOutlined,
  MailOutlined,
  BarcodeOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  BankOutlined
} from '@ant-design/icons'
import {
  RegisterFormWrapper,
  RegisterTitle,
  ButtonWrapper
} from './RegisterFormStyle'
import { InputStatus } from 'antd/lib/_util/statusUtils'
import { useRegister } from 'server/fetchLogin'

//对T内全部key的type设置为K
type SetObjectTypeTo<T, K> = { [P in keyof T]: K }

export const RegisterForm: React.FC<{ routeToLoginIn: () => void }> = ({
  routeToLoginIn
}) => {
  const { mutate } = useRegister()
  const EmailRegex =
    /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
  const init = {
    userName: '',
    password: '',
    confirmPW: '',
    email: '',
    mobile: '',
    verification: ''
  }
  const options = [
    //高频获取数据
    { value: '广东技术师范大学', alias: ['GPNU', '厂技师'] },
    { value: '广东医科大学' },
    { value: '清华大学' },
    { value: '广东轻工业技术学院', alias: ['小清华'] },
    { value: '广东工业大学' }
  ]
  const [school, setSchool] = useState('') //输入的学校名字
  const [comfirmIcon, setComfirmIcon] = useState(<CheckCircleOutlined />)
  const [inputStatus, setInputStatus] = useState<
    SetObjectTypeTo<typeof init, InputStatus>
  >({
    userName: '',
    password: '',
    confirmPW: '',
    email: '',
    mobile: '',
    verification: ''
  })
  // const defaultStatus = { ...inputStatus }
  const [inputValue, setInputValue] = useState(init)

  const vertify = (): void => {
    options.filter((item) => item.value == school).length === 0
      ? message.error('未认证的企业')
      : message.success('企业认证成功')
    const newStatus = { ...inputStatus }
    if (inputValue.userName.length < 2 || inputStatus.userName.length > 10) {
      message.error('用户名长度必须在2-10之间') // 前端校验 后端校验
      newStatus.userName = 'error'
    } else if (
      inputValue.password.length < 6 ||
      inputStatus.password.length > 15
    ) {
      message.error('密码长度必须在6-15之间') // 前端校验 后端校验
      newStatus.password = 'error'
    } else if (inputValue.password != inputValue.confirmPW) {
      message.error('两次密码不一致') // 前端校验 后端校验
      newStatus.confirmPW = 'error'
    // } else if (!EmailRegex.test(inputValue.email)) {
    //   message.error('非法邮箱格式') // 前端校验
    //   newStatus.email = 'error'
    } else if (inputValue.verification != '') {
      message.error('验证码错误') //       后端校验
      newStatus.verification = 'error'
    } else {
      setComfirmIcon(<LoadingOutlined />)
      setInputStatus(newStatus)
      mutate({
        name:inputValue.userName,
        password:inputValue.password,
        mobile:inputValue.mobile,
        school:school
      })
    }
  }

  const filterOption = (
    inputValue: string,
    option: { value: string; alias?: Array<string> } | undefined
  ) => {
    if (option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1) {
      // 忽略大小写
      return true
    } else {
      // 匹配别名
      let match = false
      option!.alias?.forEach((i) => {
        i.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          ? (match = true)
          : 0
      })
      return match
    }
  }

  return (
    <RegisterFormWrapper>
      <RegisterTitle>
        <p className="title-login">Register</p>
      </RegisterTitle>
      <AutoComplete
        defaultActiveFirstOption
        options={options}
        filterOption={filterOption}
        onChange={(value) => setSchool(value)}
      >
        <Input
          value={school}
          onChange={({ target }) => setSchool(target.value)}
          size="large"
          placeholder="学校或企业"
          prefix={<BankOutlined />}
          style={{ width: '444px' }}
        />
      </AutoComplete>
      <Input
        status={inputStatus.userName}
        value={inputValue.userName}
        onChange={({ target }) =>
          setInputValue({ ...inputValue, userName: target.value })
        }
        size="large"
        placeholder="用户名"
        prefix={<UserOutlined />}
        style={{ marginBottom: '20px', marginTop: '20px' }}
      />
      <Input.Password
        status={inputStatus.password}
        value={inputValue.password}
        onChange={({ target }) =>
          setInputValue({ ...inputValue, password: target.value })
        }
        placeholder="请您输入密码"
        prefix={<LockOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        style={{ marginBottom: '5px' }}
      />
      <Input.Password
        status={inputStatus.confirmPW}
        value={inputValue.confirmPW}
        onChange={({ target }) =>
          setInputValue({ ...inputValue, confirmPW: target.value })
        }
        placeholder="请再次输入密码"
        prefix={<BarcodeOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        style={{ marginBottom: '20px' }}
      />
      <Input
        status={inputStatus.mobile}
        value={inputValue.mobile}
        onChange={({ target }) =>
          setInputValue({ ...inputValue, mobile: target.value })
        }
        size="large"
        placeholder="手机号"
        prefix={<MailOutlined />}
        style={{ marginBottom: '5px' }}
      />
      <Input
        status={inputStatus.verification}
        value={inputValue.verification}
        onChange={({ target }) =>
          setInputValue({ ...inputValue, verification: target.value })
        }
        size="large"
        placeholder="验证码"
        prefix={<VerifiedOutlined />}
      />
      <div className="forget-password">使用邮箱验证</div>
      <ButtonWrapper>
        <Button
          type="primary"
          onClick={routeToLoginIn}
          icon={<ArrowLeftOutlined />}
        >
          返回登录
        </Button>
        <Button type="primary" onClick={vertify} icon={comfirmIcon}>
          注册
        </Button>
      </ButtonWrapper>
    </RegisterFormWrapper>
  )
}
