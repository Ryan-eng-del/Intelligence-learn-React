import { ICourseTimeReducerAction, ICourseTimeReducerState } from './type/type'

export const initialCourseTimeState: ICourseTimeReducerState = {
  courseTimeModalVisible: false,
  fileList: [],
  courseTimeName: ''
}

export const courseTimeReducer = (state: ICourseTimeReducerState, action: ICourseTimeReducerAction) => {
  const { fileList } = state
  switch (action.type) {
    case 'setModalState':
      return { ...state, courseTimeModalVisible: action.open }
    case 'setFileList':
      return { ...state, fileList: action.fileObj(fileList) }
    case 'setName':
      return { ...state, courseTimeName: action.name }
    case 'initNameAndFileList':
      return { ...state, fileList: [], courseTimeName: '' }
    default:
      throw new Error('Reducer Error')
  }
}
