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
