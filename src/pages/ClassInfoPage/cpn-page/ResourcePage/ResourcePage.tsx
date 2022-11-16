import { Header } from './Header'
import { ResourceList } from './ResourceList'
import React, { useState } from 'react'
import { useShowResourceList } from 'server/fetchCourseResource'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
export const ResourcePage: React.FC = () => {
  const { data, isLoading } = useShowResourceList()
  const [upLoadModalVisible, setUpLoadModalVisible] = useState(false)
  const showUpLoadModal = () => {
    setUpLoadModalVisible(true)
  }
  return (
    <>
      <GlobalHeader
        title="课程资源"
        tool={<PrimaryButton title="上传资源" handleClick={showUpLoadModal}></PrimaryButton>}
      ></GlobalHeader>
      <GlobalRightLayout>
        <>
          <Header
            reflush={() => console.log('更新文件列表')}
            upLoadModalVisible={upLoadModalVisible}
            setUpLoadModalVisible={setUpLoadModalVisible}
          />
          {isLoading ? <BaseLoading /> : <ResourceList resourceItems={data!} />}
        </>
      </GlobalRightLayout>
    </>
  )
}

export default ResourcePage
