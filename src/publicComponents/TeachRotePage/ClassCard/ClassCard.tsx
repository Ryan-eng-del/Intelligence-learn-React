import { Button } from 'antd'
import { PrimaryButton } from 'publicComponents/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnyFn } from 'types'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'
interface ClassCard {
  id: string
  cname: string
  iurl: string | null
  optimistic?: boolean
  Permission: boolean
}
export const ClassCard: React.FC<ClassCard> = ({ id, cname, iurl, optimistic, Permission }) => {
  const handleClick = (setCurCourse: AnyFn) => {
    if (Permission) {
      navigate('/classinfo/chapter')
      setCurCourse({
        classId: id,
        cover: iurl!,
        className: cname,
        Permission
      })
    } else {
      navigate('/classinfo/chapter')
      setCurCourse({
        classId: id,
        cover: iurl!,
        className: cname,
        Permission
      })
    }
  }
  const navigate = useNavigate()
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
              handleClick={() =>
                handleClick(() => {
                  console.log('')
                })
              }
              style={{ width: '100px', marginTop: '12px' }}
            ></PrimaryButton>
          )}
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
