/** 章节树的类型 */
export type ChapterNodeType = {
  chapterId: string
  name: string
  chapterOrder: number
  courseId: string
  courTimes?: CourTimeType[] //此字段似乎不是什么时候都存在
  childChapters: ChapterNodeType[]
}

/** 章节树中的课时的类型 */
export type CourTimeType = {
  id: string
  name: string
  resource: ChapterResourceType[]
}

/**章节树中的课时的资源的类型 */
export type ChapterResourceType = {
  type: string
  resourceName: string
  resourceId: string
}
