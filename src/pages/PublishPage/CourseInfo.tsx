import { UserOutlined } from '@ant-design/icons'
import { Avatar, message, Space } from 'antd'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import classPicUrl from 'assets/img/class.jpg'
import { ChapterStudyTree } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { useUserInfo } from 'context/UserInfoContext'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { PrimaryButton } from 'publicComponents/Button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCourseInfoById, useRandomCourseInfo } from 'server/fetchCourse'
import styled from 'styled-components'

const CourseInfo: React.FC = () => {
  const { mutateAsync } = useGetCourseInfoById()
  const { id } = useParams()
  const { data: courseInfo } = useRandomCourseInfo(id!)
  const [data, setData] = useState<any>({})
  const { requireLogin } = useUserInfo()
  useEffect(() => {
    mutateAsync(id!).then((data) => setData(data))
  }, [])

  const { treeData, chapterControl } = useChapterUI(false)
  const { showUserCard } = useUserInfo()
  return (
    <>
      <Flex>
        <img src={classPicUrl} alt="课程图片" style={{ objectFit: 'contain', width: '40%', margin: 10 }} />
        <Space direction="vertical" size="large">
          <div>
            <h1>{data?.courseName}</h1>
            <span>{data?.courseDescribe}</span>
          </div>
          <Space onClick={() => showUserCard(courseInfo?.teacher?.userId)} style={{ cursor: 'pointer' }}>
            <Avatar size={32} icon={<UserOutlined />} />
            <span>
              <span style={{ fontWeight: 'bold' }}>{courseInfo?.teacher?.name}</span> &nbsp;&nbsp;名师授课
              <br />
              <span>{courseInfo?.teacher?.headPortrait}</span>
            </span>
          </Space>
          <PrimaryButton
            title="立即加入"
            handleClick={() => {
              if (requireLogin()) {
                message.error('你已经登录了，等后端接口呢')
              }
            }}
          ></PrimaryButton>
        </Space>
      </Flex>
      <h1>课程内容概要</h1>
      <ErrorBoundary>
        <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
      </ErrorBoundary>
    </>
  )
}

export default CourseInfo

const Flex = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  flex-direction: row;
`
