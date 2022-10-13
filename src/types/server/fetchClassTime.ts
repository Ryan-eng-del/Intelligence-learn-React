export interface RelatePointsResource {
  related_points: string[]
  course_id: string
  file: any
}
export interface AddContentResource {
  related_points: string[]
  course_id: string
  file: FormData
}
export interface AddContent {
  chapter_id: string
  name: string
  paper_id?: string
  paper_name?: string
  resource_ids?: string[]
}
export interface EditContent {
  /**
   * 章节id
   */
  chapter_id: string
  /**
   * 课时id
   */
  class_time_id: string
  /**
   * 课时名
   */
  name: string
  /**
   * 试卷id
   */
  paper_id: string
  /**
   * 试卷名称
   */
  paper_name: string
  /**
   * 资源id集合
   */
  resource_ids: string[]
}
