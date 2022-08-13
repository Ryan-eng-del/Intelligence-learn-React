import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { client } from 'server'
import cache from 'util/cache'
import { delayFetch } from 'util/delayFetch'

// 登录
export const useToken = (name: string, password: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(
    async () => {
      await delayFetch()
      return client.post<{ token: string }>({
        url: '18795596?apifoxResponseId=68831913',
        data: { name, password }
      })
    },
    {
      onSuccess: (data) => {
        console.log(data)
        queryClient.setQueryData(['token'], data)
        cache.setCache('token', data)
        navigate('/home/class/teach')
        message.success('登录成功，欢迎回来')
      }
    }
  )
}
