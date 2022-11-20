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
        data: {
          name: data.name,
          password: data.password,
          verifyCode: data.verifyCode,
          verifyKey: data.verifyKey
        }
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
  return useMutation(
    async (data: {
      name: string
      password: string
      email?: string
      mobile?: string
      sex?: number
      school?: string
    }) => {
      return client.post<{ token: string }>({
        url: '/user/registry',
        data: {
          name: data.name,
          password: data.password,
          email: data.email,
          mobile: data.mobile,
          sex: data.sex,
          school: data.school
        }
      })
    },
    {
      onSuccess: (data) => {
        // 这里怎么判断？ 不管成功与否都是undefined
        console.log('注册了' + data)
        // 刷新
        // navigate(0)
      }
    }
  )
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
