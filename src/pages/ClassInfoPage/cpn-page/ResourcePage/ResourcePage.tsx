import { Header } from './Header'
import { ResourceList } from './ResourceList'
import React, { useState } from 'react'
import { ResourcePageWrapper } from './ResourcePageStyle'
import { useShowResourceList } from 'server/fetchCourseResource'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ResourceCard } from './ResourceCard'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
export const ResourcePage: React.FC = () => {

  const [mode,setMode] = useState(false)

  const { data, isLoading } = useShowResourceList()
  console.log(data)

  return (
    <>
      <ResourcePageWrapper>
        <CurCourseProvider>
          {({curCourse})=><>
            <Header
              reflush={()=>console.log("更新文件列表")}
              switchMode={setMode}
              />
            {
              isLoading ? <BaseLoading /> :
              mode ? <ResourceList resourceItems={data!} premission={curCourse.Permission} />:
              <ResourceCard resourceItems={data!} premission={curCourse.Permission}/>
            }
          </>}
        </CurCourseProvider>
      </ResourcePageWrapper>
    </>
  )
}

export default ResourcePage
