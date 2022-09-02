export let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://prod/'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:4523/m2/792185-0-default/'
} else {
  baseURL = 'https://test/'
}
export const TIME_OUT = 10000
