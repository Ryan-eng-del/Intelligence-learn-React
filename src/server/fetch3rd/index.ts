import { useQuery } from '@tanstack/react-query'
import AXIOS from '../request/request'

export const client = new AXIOS({
  baseURL: 'https://api.github.com',
  timeout: 100000
})

export const useGetContributor = () => {
  return useQuery(['Contributor'], async () => {
    return client.get({
      url: '/repos/Ryan-eng-del/intelligence-learn/contributors'
    })
  })
}
