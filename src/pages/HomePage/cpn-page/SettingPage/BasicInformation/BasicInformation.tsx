import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { Badge, Button, Space, Tag } from 'antd'
import { useUserInfo } from 'context/UserInfoContext'
import { EditableText } from 'publicComponents/Community/EditableText'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserInfo } from 'server/fetchUser'
import { BasicInformationWrapper } from '../SettingPageStyle'

export const BasicInformation = () => {
  const { userInfo } = useUserInfo()
  // 这里其实可以获取的到
  const [userName, setUserName] = useState(userInfo?.name)
  const [sign, setSign] = useState(userInfo?.personalSignature)
  const [hasChange, setHasChange] = useState(false)
  const [gender, setGender] = useState(userInfo?.sex || 2)
  const { mutateAsync } = useUpdateUserInfo()
  const navigate = useNavigate()

  const update = async () => {
    await mutateAsync({ name: userName!, sex: gender, personalSignature: sign! })
    navigate(0)
  }

  return (
    <>
      <BasicInformationWrapper>
        <Space direction="vertical">
          <Space align="baseline">
            用户名：
            <EditableText text={userName!} onChange={(t) => (setUserName(t), setHasChange(true))} />
          </Space>

          <Space align="baseline">
            个性签名：
            <EditableText text={sign!} onChange={(t) => (setSign(t), setHasChange(true))} />
          </Space>
          <Space align="baseline">
            性别：
            <Tag
              color={gender == 0 ? 'blue' : gender == 1 ? 'red' : 'purple'}
              onClick={() => {
                setGender((pre) => (!pre ? 1 : 0))
                setHasChange(true)
              }}
            >
              {gender !== 0 && <WomanOutlined />}
              {gender !== 1 && <ManOutlined />}
            </Tag>
          </Space>

          <Space align="baseline">注册时间：2018-04-24 18:00:00</Space>
          <Space align="baseline">
            企业：<Tag color="red">厂东技术师范大学</Tag>
          </Space>
          <Space align="baseline">
            部门：<Tag color="lime">计算机科学学院</Tag>
          </Space>
          <Space align="baseline">编号：未分配</Space>
          <Space align="baseline">
            账号状态：
            <Badge status="processing" text="正常" />
          </Space>
          {hasChange && (
            <Button type="primary" onClick={update}>
              保存
            </Button>
          )}
        </Space>
      </BasicInformationWrapper>
    </>
  )
}
