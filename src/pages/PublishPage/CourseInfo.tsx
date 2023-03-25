import { message } from 'antd'
import classPicUrl from 'assets/img/class.jpg'
import { ChapterStudyTree } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { useUserInfo } from 'context/UserInfoContext'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { PrimaryButton } from 'publicComponents/Button'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCourseInfoById } from 'server/fetchCourse'
import styled from 'styled-components'

const CourseInfo: React.FC = () => {
  const { mutateAsync } = useGetCourseInfoById()
  const [data, setData] = useState<any>({})
  const { id } = useParams()
  const { requireLogin } = useUserInfo()
  useEffect(() => {
    mutateAsync(id!).then((data) => setData(data))
  }, [])

  const { treeData, chapterControl } = useChapterUI(false)

  return (
    <>
      <Flex>
        <img src={classPicUrl} alt="课程图片" style={{ objectFit: 'contain', width: '40%', margin: 10 }} />
        <div>
          <h1>{data?.courseName}</h1>
          <span>{data?.courseDescribe}</span>
        </div>
        <Unaccomplished>无接口</Unaccomplished>
        <PrimaryButton
          title="立即加入"
          handleClick={() => {
            if (requireLogin()) {
              message.error('你已经登录了，等后端接口呢')
            }
          }}
        ></PrimaryButton>
      </Flex>
      <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
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
