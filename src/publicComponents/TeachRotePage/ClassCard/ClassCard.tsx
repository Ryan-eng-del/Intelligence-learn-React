import { Button } from 'antd'
import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'

interface ClassCard {
  id: string
  cname: string
  iurl: string | null
  optimistic?: boolean
  to: 'teacher' | 'student'
}

export const ClassCard: React.FC<ClassCard> = ({id, to, cname, iurl, optimistic}) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(`/classinfo/${to}/${id}/chapter`)
  return (
    <>
      <CardWrapper>
        <CardHeadWrapper>
          <img src={iurl || require('assets/img/class.jpg')} alt="课程图片" />
        </CardHeadWrapper>
        <CardBodyWrapper>
          <div className="tname">{cname}</div>
          {optimistic ? (
            <Button type="primary" loading>
              Loading
            </Button>
          ) : (
            <PrimaryButton
              title="进入课程"
              handleClick={handleClick}
              style={{ width: '100px', marginTop: '12px' }}
            ></PrimaryButton>
          )}
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
