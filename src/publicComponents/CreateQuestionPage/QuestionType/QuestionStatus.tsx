import { Tag } from 'antd'

interface QuestionStatusProps {
  config: 'success' | 'warning' | 'processing'
  title: string
}

export const QuestionStatus = ({ config, title }: QuestionStatusProps) => {
  console.log(config, title, '---config tag')
  return (
    <>
      <Tag color={config}>{title}</Tag>
    </>
  )
}
