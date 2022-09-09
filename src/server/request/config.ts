export let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://prod/'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://mock.apifox.cn/m1/792185-0-default'
} else {
  baseURL = 'https://test/'
}
export const TIME_OUT = 10000
