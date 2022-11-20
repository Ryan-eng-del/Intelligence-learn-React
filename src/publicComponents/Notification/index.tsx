import { notification, Tag } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'
type TagConfig = { color: string; content: string }
notification.config({
  maxCount: 1,
  duration: 2
})
export const openNotification = (
  msg: string,
  type: NotificationType,
  config?: Record<string, any>,
  tag?: TagConfig
) => {
  const key = `open${Date.now()}`
  notification[type]({
    message: '通知 -- Notification 👇',
    description: (
      <div className="mt-4">
        <span className="text-sm">{msg}</span>
        <div className="mt-3">
          <Tag key={tag?.color} color={tag?.color}>
            {tag?.content}
          </Tag>
        </div>
      </div>
    ),
    key,
    ...config
  })
}
