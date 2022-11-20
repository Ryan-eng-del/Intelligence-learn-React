export interface RelatePointsResource {
  related_points: string[]
  course_id: string
  file: any
}

export interface AddContentResource {
  relatedPoints: string[]
  CourseId: string
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
  chapter_id: string
  class_time_id: string
  name: string
  paper_id: string
  paper_name: string
  resource_ids: string[]
}
