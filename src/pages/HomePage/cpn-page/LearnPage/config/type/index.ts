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
}
export type LearnPageAction =
  | { type: 'setImgUrl'; payload: string }
  | { type: 'setClassName'; payload: string }
  | { type: 'setClassLearner'; payload: string }
  | { type: 'setClasList'; payload: ClassList }
  | { type: 'setModalVisible'; payload: boolean }
  | { type: 'setUploadLoading'; payload: boolean }
