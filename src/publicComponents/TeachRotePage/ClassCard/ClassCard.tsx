import { Button } from 'antd'
import { CurCourseProvider } from 'pages/ClassInfoPage/ClassInfoPage'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnyFn } from 'types'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'
interface ClassCard {
  id: string
  tname: string
  cname: string
  iurl: string | null
  optimistic?: boolean
  Permission: boolean
}
export const ClassCard: React.FC<ClassCard> = ({ id, cname, iurl, optimistic, Permission }) => {
  const handleClick = (setCurCourse:AnyFn) => {
    if(Permission){
      navigate('/classinfo/chapter');
      setCurCourse({
        courseId:id,
        cover:iurl!,
        courseName:cname,
        Permission
      })
    }
    else{
      navigate('/studentClassinfo/chapter');
      setCurCourse({
        courseId:id,
        cover:iurl!,
        courseName:cname,
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
            <CurCourseProvider>
              {({ setCurCourse }) => (
                <Button
                  type="primary"
                  onClick={() => handleClick(setCurCourse)}
                >
                  进入课程
                </Button>
              )}
            </CurCourseProvider>
          )}
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
