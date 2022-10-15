export interface AddChapterParam {
  course_id: string
  name: string
  pid: string
}
export interface EditChapterParam {
  chapter_id: string
  new_name: string
}

/*章节树Data*/
export interface ChapterData {
  chapterOrder: number
  childChapters: ChildChapter[]
  courTimes: string[]
  id: string
  name: string
  pid: string
}

export interface ChildChapter {
  chapterOrder?: number
  childChapters: ChildChapter[]
  courTimes: CourTime[]
  id: string
  name: string
  pid: string
}

export interface CourTime {
  chapterId: string
  classTimeId: string
  name: string
  paperId: string
  paperName: string
  resource: Resource[]
}

export interface Resource {
  resourceId: string
  resourceLink: string
  resourceName: string
  type: number
}
/*添加课时参数*/
export interface addClassTimeParam {
  /**
   * 章节id
   */
  chapter_id: string
  /**
   * 课时名
   */
  name: string
  /**
   * 作业id
   */
  paper_id?: string
  /**
   * 作业名称
   */
  paper_name?: string
  /**
   * 资源id集合
   */
  resource_ids?: string[]
}
