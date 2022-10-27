export interface ClassMana {
  class_id: string
  class_name: string
  student_number: number
  class_invitation_code: string
  renameState: boolean //重命名状态
}
export interface ClassManaPageState {
  inputClassName: string
  newClassName: string
  searchKeyword: string
  modalVisible: boolean //添加班级模态窗状态
  classManaList: ClassMana[] //班级列表
}
export type ClassManaPageAction =
  | { type: 'rename'; curItem: ClassMana }
  | { type: 'removeClass'; id: string }
  | { type: 'rename_certain'; payload: {classId:string,newClassName:string} }
  | { type: 'rename_cancel'; curItem: ClassMana }
  | { type: 'addClass'; classManaItem: ClassMana }
  | { type: 'setModalVisible'; payload: boolean }
  | { type: 'setClassName'; payload: string }
  | { type: 'setNewClassName'; payload: string }
  | { type: 'searchClassList'; payload: ClassMana[] }
  | { type: 'setSearchKeyword'; payload: string }
  | { type: 'setClassManaList'; payload: ClassMana[] }

  export interface ClassManaStudentType{
    name:string
    mobile:string
    class_name:string
    join_time:string
    role:number
  }