import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'

interface ClassCard {
  classId: string
  cname: string
  iurl: string | null
  to: 'teacher' | 'student'
}

export const ClassCard: React.FC<ClassCard> = ({ classId, to, cname, iurl }) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(`/classinfo/${classId}/${to}/chapter`)

  return (
    <>
      <CardWrapper>
        <CardHeadWrapper>
          <img src={iurl || require('assets/img/class.jpg')} alt="课程图片" />
        </CardHeadWrapper>
        <CardBodyWrapper>
          <div className="tname">{cname}</div>
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
