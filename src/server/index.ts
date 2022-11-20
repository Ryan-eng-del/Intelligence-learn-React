import HYRequest from './request/request'
import { baseURL, TIME_OUT } from './request/config'
import localCache from '../util/cache'
export const client = new HYRequest({
  baseURL: baseURL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config: any) => {
      const token = localCache.getCache('token') ?? ''
      console.log(token, 'token')
      if (token) {
        config.headers.token = `${JSON.parse(token)['token']}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
