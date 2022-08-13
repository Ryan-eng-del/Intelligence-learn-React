export let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://prod/'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = '	https://mock.apifox.cn/m2/792185-0-defaul/'
} else {
  baseURL = 'https://test/'
}
export const TIME_OUT = 10000
