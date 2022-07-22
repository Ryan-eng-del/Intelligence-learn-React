import type { ClassManaPageAction, ClassManaPageState } from '../type/index'
export const initialState: ClassManaPageState = {
  inputClassName: '',
  newClassName: '',
  searchKeyword: '',
  modalVisible: false,
  classManaList: [
    { id: '1', className: '20软件1', studentAmount: 0, renameState: false },
    { id: '2', className: '20软件2', studentAmount: 0, renameState: false },
    { id: '3', className: '20软件3', studentAmount: 0, renameState: false }
  ]
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
        if (item.id === action.curItem.id) {
          item.renameState = true
        }
      })
      return { ...newState }
    case 'rename_certain': //重命名确认
      newState.classManaList.map((item) => {
        if (newState.newClassName.trim()) {
          if (item.id === action.curItem.id) {
            //一定要有不能删
            item.className = newState.newClassName
            item.renameState = false
            newState.newClassName = ''
          }
        } else {
          item.renameState = false
        }
      })
      return { ...newState }
    case 'rename_cancel': //重命名取消
      newState.classManaList.map((item) => {
        if (item.id === action.curItem.id) {
          item.renameState = false
        }
      })
      return { ...newState }
    case 'removeClass': //删除班级
      newState.classManaList = newState.classManaList.filter((item) => {
        return item.id != action.id
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
      console.log(newState)
      return { ...newState }
    case 'setNewClassName':
      return { ...newState, newClassName: action.payload }
    case 'setClassName':
      return { ...newState, inputClassName: action.payload }
    case 'setModalVisible': //设置模态框状态
      return { ...newState, modalVisible: action.payload }
    case 'searchClassList': //搜索功能
      for (let i = 0; i < newState.classManaList.length; i++) {
        if (!newState.classManaList[i].className.indexOf(action.payload)) {
          newClassList.push(newState.classManaList[i])
        }
      }
      return { ...newState, classManaList: newClassList }
    case 'setSearchKeyword':
      return { ...newState, searchKeyWord: action.payload }
    default:
      throw new Error()
  }
}
