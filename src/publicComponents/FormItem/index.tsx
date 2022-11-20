import { Form } from 'antd'
import Input from 'antd/es/input'
import classnames from 'classnames'

interface FormItemProps {
  filed: string | string[]
  placeholder: string
  rules: any[]
  prefix: JSX.Element
  defaultValue?: string
}

export const FormItem = (props: FormItemProps) => {
  const { filed, placeholder, rules, prefix, defaultValue } = props
  return (
    <Form.Item name={filed} rules={rules}>
      <Input
        defaultValue={defaultValue}
        type={filed === 'password' ? 'password' : ''}
        style={{ borderRadius: '0.5rem' }}
        className={classnames(['mb-2', 'h-11'])}
        prefix={prefix}
        placeholder={placeholder}
      />
    </Form.Item>
  )
}
