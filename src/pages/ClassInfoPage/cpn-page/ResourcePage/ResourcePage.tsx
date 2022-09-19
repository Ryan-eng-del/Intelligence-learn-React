import { Header } from './Header'
import { ResourceList } from './ResourceList'
import React from 'react'
import { ResourcePageWrapper } from './ResourcePageStyle'
import { useShowResourceList } from 'server/fetchCourseResource'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
export const ResourcePage: React.FC = () => {
  const { data, isLoading } = useShowResourceList()
  console.log(data)

  return (
    <>
      <ResourcePageWrapper>
        <Header reflush={() => console.log('更新文件列表')} />
        {isLoading ? <BaseLoading /> : <ResourceList resourceItems={data!} />}
      </ResourcePageWrapper>
    </>
  )
}

export default ResourcePage
