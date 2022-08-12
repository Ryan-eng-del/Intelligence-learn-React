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

// ChapterFolder
export type ChapterFolderType = {
  chapterId: string
  name: string
  chapterOrder?: number
  courseId?: string //可能弃用
  childChapters: ChapterFolderType[] // 子文件夹
  courTimes?: ChapterCourTimesType[]
}

export type ChapterCourTimesType = {
  taskId: string
  name: string
  tag: string
}
