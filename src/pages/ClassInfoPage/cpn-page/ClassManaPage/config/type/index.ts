export interface ClassManaList {
  id: string
  className: string
  studentAmount: number
  renameState: boolean //重命名状态
}
export interface ClassManaPageState {
  inputClassName: string
  newClassName: string
  searchKeyword: string
  modalVisible: boolean //添加班级模态窗状态
  classManaList: Array<ClassManaList> | [] //班级列表
}
export type ClassManaPageAction =
  | { type: 'rename'; curItem: ClassManaList }
  | { type: 'removeClass'; id: string }
  | { type: 'rename_certain'; curItem: ClassManaList }
  | { type: 'rename_cancel'; curItem: ClassManaList }
  | { type: 'addClass'; classManaItem: ClassManaList }
  | { type: 'setModalVisible'; payload: boolean }
  | { type: 'setClassName'; payload: string }
  | { type: 'setNewClassName'; payload: string }
  | { type: 'searchClassList'; payload: string }
  | { type: 'setSearchKeyword'; payload: string }
