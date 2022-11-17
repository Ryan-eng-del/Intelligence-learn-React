import React, { useContext, useReducer } from 'react'
import { courseTimeReducer, initialCourseTimeState } from '../../reducer/ChaperStudyTree/courseTimeReducer'
import { ICourseTimeReducerAction, ICourseTimeReducerState } from '../../reducer/ChaperStudyTree/type/type'
interface IClassTimeContext {
  dispatch: React.Dispatch<ICourseTimeReducerAction>
  classTimeState: ICourseTimeReducerState
}
const ClassTimeDispatchContext = React.createContext<null | IClassTimeContext>(null)

export const ClassTimeDispatchContextProvider = (props: any) => {
  /* ClassTime Reducer */
  const [classTimeState, dispatchClassTime] = useReducer(courseTimeReducer, initialCourseTimeState)
  return (
    <ClassTimeDispatchContext.Provider value={{ dispatch: dispatchClassTime, classTimeState }}>
      {props.children}
    </ClassTimeDispatchContext.Provider>
  )
}
export const useClassTimeDispatch = () => {
  const { dispatch, classTimeState } = useContext(ClassTimeDispatchContext) as IClassTimeContext
  return { dispatch, classTimeState }
}
