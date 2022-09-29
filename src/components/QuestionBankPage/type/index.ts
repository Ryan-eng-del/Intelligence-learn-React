import { Item } from 'server/fetchExam/types'

export interface ShowDetailsCellProps
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  record: Item
  children: React.ReactNode
}
