import { useQuery } from '@tanstack/react-query'
import { client } from '../index'
export const useShowKG = () => {
  return useQuery(['KG'], async () => {
    return client.get({ url: '/points/KG/show' })
  })
}
export const useShowMG = () => {
  return useQuery(
    ['MG'],
    async () => {
      return client.get({ url: '/points/KG/student' })
    },
    {
      onSuccess(data) {
        console.log(data, 'data')
      },
      onError() {
        console.log('error')
      }
    }
  )
}
