import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'
interface ClassCard {
  id: string
  tname: string
  cname: string
  iurl: string | null
  optimistic?: boolean
}
export const ClassCard: React.FC<ClassCard> = (props) => {
  const { id, cname, iurl, optimistic } = props
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
            <Button
              type={'primary'}
              onClick={() =>{
                navigate('/classinfo/chapter', {
                  state: { cname, iurl, id }
                });
                // useQuery(['CurrentCourse'],()=>({ //保存到Query好过保存到路由参数
                //   CourseName: cname,
                //   CourseBanner: iurl,
                //   CourseID: id
                // }))
              }}
            >
              进入课程
            </Button>
          )}
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
