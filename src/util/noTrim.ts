import { GlobalMessage } from '../publicComponents/GlobalMessage'

export const noTrim = (value: string) => {
  const isTrim = value.trim() === ''
  if (isTrim) {
    GlobalMessage('info', '不能添加空字段')
    return true
  }
  return false
}
