export interface Item {
  key: string
  question: string
  rate: string
  type: string
  creator: string
  create_time: string
  questionId: string
  rightAnswer: string
  questionOption: string
}

export interface ShowDetailsCellProps
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  record: Item
  children: React.ReactNode
}
