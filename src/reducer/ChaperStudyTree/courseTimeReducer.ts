import { ICourseTimeReducerAction, ICourseTimeReducerState } from './type/type'

export const initialCourseTimeState: ICourseTimeReducerState = {
  courseTimeModalVisible: false,
  fileList: [],
  courseTimeName: '',
  ids: [],
  paper_id: '',
  paper_name: ''
}

export const courseTimeReducer = (state: ICourseTimeReducerState, action: ICourseTimeReducerAction) => {
  const { fileList, ids } = state
  switch (action.type) {
    case 'setModalState':
      return { ...state, courseTimeModalVisible: action.open }
    case 'setFileList':
      return { ...state, fileList: action.fileObj(fileList) }
    case 'setName':
      return { ...state, courseTimeName: action.name }
    case 'initNameAndFileList':
      return { ...state, fileList: [], courseTimeName: '' }
    case 'pushId':
      return { ...state, ids: ids.concat(action.id) }
    case 'pushpaperId':
      return { ...state, paper_id: action.paper_id }
    case 'pushpaperName':
      return { ...state, paper_name: action.paper_name }
    case 'clearId':
      return { ...state, ids: [] }
    default:
      throw new Error('Reducer Error')
  }
}
