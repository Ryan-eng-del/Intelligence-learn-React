import { message } from 'antd'

const isError = (err: any): err is Error => err?.messge

export const ErrorBox = ({ error }: { error: Error }) => {
  if (isError(error)) {
    message.error(error.message)
  }
}
