import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { client } from 'server'
import cache from 'util/cache'

// 登录
export const useToken = () => {
  const navigate = useNavigate()
  return useMutation(
    (data: { name: string; password: string; verifyCode: string; verifyKey: string }) => {
      return client.post<{ token: string }>({
        url: '/user/login',
        data
      })
    },
    {
      onSuccess: (data) => {
        if (data) {
          cache.setCache('token', data.token)
          console.log(data, 'data')
          message.success('登录成功，欢迎回来')
          navigate('/home/teach')
        }
      }
    }
  )
}

// 注册
export const useRegister = () => {
  return useMutation(async (data) => {
    return client.post<{ token: string }>({
      url: '/user/registry',
      data
    })
  })
}

export const useGetUserInfo = () => {
  return useMutation(async () => {
    return client.get({
      url: '/user/show-detail'
    })
  })
}

export const useGetCaptcha = () => {
  return useMutation(async () => {
    return client.get({
      url: '/user/get-code'
    })
  })
}

export const useGetEmailCode = () => {
  return useMutation(async (email: string) => {
    return client.get({
      url: '/user/get-email-code',
      params: {
        email
      }
    })
  })
}
