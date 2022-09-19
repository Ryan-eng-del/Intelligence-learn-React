import exp from 'constants'

export interface ClassList {
  iurl: string
  cname: string
  tname: string
  id: string
}
export interface LearnPageState {
  imgUrl: string
  className: string
  classLearner: string
  classList: Array<ClassList> | []
  modalVisible: boolean
  uploadLoading: boolean
  invitedcode: string
}

export interface courseType {
  course_id: string
  course_name: string
  courses_cover: string | null
  course_describe: string | null
  optimistic: boolean
}

export type LearnPageAction =
  | { type: 'setImgUrl'; payload: string }
  | { type: 'setClassName'; payload: string }
  | { type: 'setClassLearner'; payload: string }
  | { type: 'setClasList'; payload: ClassList }
  | { type: 'setModalVisible'; payload: boolean }
  | { type: 'setUploadLoading'; payload: boolean }
  | { type: 'setInvitedCode'; payload: string }
