import type { LearnPageAction, LearnPageState } from '../type'
export const initialState: LearnPageState = {
  imgUrl: '',
  className: '',
  classLearner: '',
  classList: [
    {
      iurl: '',
      cname: '',
      tname: '',
      id: ''
    }
  ],
  modalVisible: false,
  uploadLoading: false
}
export const LearnRoutePageReducer = (
  state: LearnPageState,
  action: LearnPageAction
) => {
  let newClassList = null
  switch (action.type) {
    case 'setImgUrl':
      return { ...state, imgUrl: action.payload }
    case 'setClassName':
      return { ...state, className: action.payload }
    case 'setClassLearner':
      return { ...state, classLearner: action.payload }
    case 'setClasList':
      newClassList = [...state.classList].concat(action.payload)
      return { ...state, classList: newClassList }
    case 'setModalVisible':
      return { ...state, modalVisible: action.payload }
    case 'setUploadLoading':
      return { ...state, uploadLoading: action.payload }
    default:
      throw new Error()
  }
}
