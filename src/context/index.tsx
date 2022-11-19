import { ClassInfoContext } from './ClassInfoContext'
import { UserInfoContextProvider } from './UserInfoContext'
import { ClassTimeDispatchContextProvider } from './ChapterStudyTree/ClassTimeDispatchContext'

export const ContextProvider = (props: any) => {
  return (
    <ClassInfoContext>
      <UserInfoContextProvider>
        <ClassTimeDispatchContextProvider>{props.children}</ClassTimeDispatchContextProvider>
      </UserInfoContextProvider>
    </ClassInfoContext>
  )
}
