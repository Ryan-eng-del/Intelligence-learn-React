import { Header } from './Header'
import { ResourceList } from './ResourceList'
import React, { useState } from 'react'
import { ResourcePageWrapper } from './ResourcePageStyle'
import { Button } from 'antd'
import { useShowResourceList } from 'server/fetchCourseResource'
export const ResourcePage: React.FC = () => {
  const [resourceItems, setResourceItems] = useState([
    {
      id: '0',
      name: '文件名.png',
      time: '07-20 00:35',
    },
    {
      id: '1',
      name: '文件.mp4',
      time: '07-20 00:35',
    },
    {
      id: '2',
      name: '文件名.ppt',
      time: '07-20 00:35',
    }
  ])



  return (
    <>
      <ResourcePageWrapper>

        <Header reflush={()=>console.log("更新文件列表")}/>
        <Button onClick={()=>{
          const { data, isLoading } = useShowResourceList()
          console.log(data, isLoading);
          setResourceItems(data)
        }}>神奇按钮</Button>
        <ResourceList
          resourceItems={resourceItems}
        />
      </ResourcePageWrapper>
    </>
  )
}

export default ResourcePage
