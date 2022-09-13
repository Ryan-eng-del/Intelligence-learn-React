import { QueryClient } from '@tanstack/react-query'
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
export const ClassCard: React.FC<ClassCard> = ({ id, cname, iurl, optimistic,  }) => {
  const queryClient = new QueryClient()
  const handleClick = () => {
    queryClient.setQueryData(['CurrentCourse'],{ cname, iurl, id })
    console.log(cname);
    navigate('/classinfo/chapter', {
      state: { cname, iurl, id }
    });
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
            <Button type='primary' onClick={handleClick}>
              进入课程
            </Button>
          )}
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
