export let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://prod/'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://10.0.11.88:8089'   // 内部测试环境
  // baseURL = 'https://mock.apifox.cn/m1/792185-0-default'
} else {
  baseURL = 'https://test/'
}

/* BaseUrl Mock http://127.0.0.1:3000/api  端口号看自己的com */
export const TIME_OUT = 10000
