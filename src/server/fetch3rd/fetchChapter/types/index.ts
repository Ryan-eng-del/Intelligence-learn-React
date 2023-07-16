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
  type: number
  resourceName: string
  resourceId: string
  resourceLink: string
}

/**章节树中课时资源的作业资源的类型 */
export type homeworkList = {
  isReview: boolean
  paperId: string
  paperName: string
  isDone: boolean
  hasRemakeTime: number
  startTime: string
  endTime: string
}
