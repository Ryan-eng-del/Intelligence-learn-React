import { message } from 'antd'

export const GlobalMessage = (
  type: 'success' | 'info' | 'warning' | 'error' | 'loading',
  msg: string,
  option?: { [key: string]: any }
) => {
  message.config({
    maxCount: 1,
    duration: 1.5
  })
  message[type]({ content: msg, ...(option || {}) })
}
