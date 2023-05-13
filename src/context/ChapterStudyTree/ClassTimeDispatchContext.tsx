import React, { useContext, useReducer } from 'react'
import { courseTimeReducer, initialCourseTimeState } from 'reducer/ChaperStudyTree/courseTimeReducer'
import { ICourseTimeReducerAction, ICourseTimeReducerState } from 'reducer/ChaperStudyTree/type/type'

interface IClassTimeContext {
  dispatch: React.Dispatch<ICourseTimeReducerAction>
  classTimeState: ICourseTimeReducerState
}

const ClassTimeDispatchContext = React.createContext<IClassTimeContext>({
  // 无意义的初始值
  dispatch: (i: ICourseTimeReducerAction) => {
    i
  },
  classTimeState: {
    courseTimeModalVisible: false,
    fileList: [],
    courseTimeName: '',
    ids: [],
    paper_id: '',
    paper_name: ''
  }
})

export const ClassTimeDispatchContextProvider = (props: any) => {
  /* ClassTime Reducer */
  const [classTimeState, dispatchClassTime] = useReducer(courseTimeReducer, initialCourseTimeState)
  return (
    <ClassTimeDispatchContext.Provider value={{ dispatch: dispatchClassTime, classTimeState }}>
      {props.children}
    </ClassTimeDispatchContext.Provider>
  )
}

export const useClassTimeDispatch: () => IClassTimeContext = () => useContext(ClassTimeDispatchContext)
