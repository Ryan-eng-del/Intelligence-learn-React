import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from 'server/fetchCourse/types'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'


export const ClassCard: React.FC<{
  classInfo: CourseList
  to: 'MyTeach' | 'MyStudy'
}> = ({ classInfo , to }) => {
  const navigate = useNavigate()
  const  { dispatchClassInfo } = useCurrentClassInfo()

  const handleClick = () => {
    dispatchClassInfo({...classInfo,isOwner:to=="MyTeach"})
    navigate(`/${to}/${classInfo.courseId}/chapter`)
  }
  return (
    <>
      <CardWrapper>
        <CardHeadWrapper>
          <img src={classInfo.coursesCover || require('assets/img/class.jpg')} alt="课程图片" />
        </CardHeadWrapper>
        <CardBodyWrapper>
          <div className="tname">{classInfo.courseName}</div>
          <PrimaryButton
            title="进入课程"
            handleClick={handleClick}
            style={{ width: '100px', marginTop: '12px' }}
          ></PrimaryButton>
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
