import { ClassMana as classmana } from '../type'
import type { ClassManaPageAction, ClassManaPageState } from '../type/index'
export const initialState: ClassManaPageState = {
  inputClassName: '',
  newClassName: '',
  searchKeyword: '',
  modalVisible: false,
  classManaList: []
}

export const ClassManaPageReducer = (
  state: ClassManaPageState,
  action: ClassManaPageAction
) => {
  const newState = { ...state }
  const newClassList = []
  switch (action.type) {
    case 'rename': //重命名功能
      newState.classManaList.map((item) => {
        if (item.class_id === action.curItem.class_id) {
          item.renameState = true
        }
      })
      return { ...newState }
    case 'rename_certain': //重命名确认
      newState.classManaList.map((item) => {
        if (action.payload.newClassName.trim()) {
          if (item.class_id === action.payload.classId) {
            //一定要有不能删
            item.class_name = action.payload.newClassName
          }
        }
      })
      return { ...newState }
    case 'rename_cancel': //重命名取消
      newState.classManaList.map((item) => {
        if (item.class_id === action.curItem.class_id) {
          item.renameState = false
        }
      })
      return { ...newState }
    case 'removeClass': //删除班级
      newState.classManaList = newState.classManaList.filter((item) => {
        return item.class_id != action.id
      })
      return {
        ...newState
      }
    case 'addClass': //添加班级
      if (newState.inputClassName.trim()) {
        newState.classManaList = [...newState.classManaList].concat(
          action.classManaItem
        )
        newState.inputClassName = ''
      } else {
        console.log('班级名称不能为空')
      }
      return { ...newState }
    case 'setNewClassName':
      return { ...newState, newClassName: action.payload }
    case 'setClassName':
      return { ...newState, inputClassName: action.payload }
    case 'setModalVisible': //设置模态框状态
      return { ...newState, modalVisible: action.payload }
    // case 'searchClassList': //搜索功能
    //   for (let i = 0; i < action.payload.classManaList.length; i++) {
    //     if (!newState.classManaList[i].className.indexOf()) {
    //       newClassList.push(newState.classManaList[i])
    //     }
    //   }
    //   return { ...newState, classManaList: newClassList }
    case 'setSearchKeyword':
      return { ...newState, searchKeyWord: action.payload }
    // case 'setClassManaList':
    //   return {...newState, classManaList: action.payload}
    default:
      throw new Error()
  }
}
