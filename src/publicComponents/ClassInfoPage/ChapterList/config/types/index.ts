export type ChapterListType = {
  title: string
  id: number
  sub?: ListItem[] //| DivLine[]
}[]

export type ListItem = {
  tag: string
  id: number
  title: string
}

// 考虑以后做分割线
// type DivLine = {
//   tag: string
// }
