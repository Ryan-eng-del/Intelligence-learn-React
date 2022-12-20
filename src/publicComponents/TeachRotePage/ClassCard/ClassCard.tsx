import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from 'server/fetchCourse/types'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'
import classPicUrl from 'assets/img/class.jpg'

export const ClassCard: React.FC<{
  classInfo: CourseList
  to: 'MyTeach' | 'MyStudy'
  EditModal?: () => void
}> = ({ classInfo, to, EditModal }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${to}/${classInfo.courseId}/chapter`)
  }

  return (
    <>
      <CardWrapper>
        {to == 'MyTeach' ? (
          <a className="magBtn" onClick={EditModal}>
            管理
          </a>
        ) : (
          <></>
        )}
        <CardHeadWrapper>
          <img src={classInfo.coursesCover || classPicUrl} alt="课程图片" />
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
