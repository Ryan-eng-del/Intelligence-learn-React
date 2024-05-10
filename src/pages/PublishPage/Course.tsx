import { Badge, Carousel } from 'antd'
import b1 from 'assets/img/b1.png'
import b2 from 'assets/img/b2.png'
import b3 from 'assets/img/b3.png'
import classPicUrl from 'assets/img/class.jpg'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import { useNavigate } from 'react-router-dom'
import { useRandomCourse } from 'server/fetchCourse'

const contentStyle: React.CSSProperties = {
  margin: 0,
  objectFit: 'cover',
  height: '400px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#364d79'
}
const Course = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  const navigate = useNavigate()
  const { data } = useRandomCourse()

  return (
    <div>
      <Carousel afterChange={onChange} autoplay autoplaySpeed={1000}>
        {' '}
        <img src={b2} style={contentStyle} />
        <img src={b1} style={contentStyle} />
        <img src={b3} style={contentStyle} />
      </Carousel>
      <h1>为您推荐</h1>
      <Flex>
        {data &&
          data.slice(0, 4).map((i: any, index: any) => {
            return (
              <Badge.Ribbon key={i.courseId} text={i.school.toLocaleUpperCase()} color="green">
                <CardWrapper onClick={() => navigate(`/course/${i.courseId}`)}>
                  <CardHeadWrapper>
                    <img src={classPicUrl} alt="课程图片" />
                  </CardHeadWrapper>
                  <CardBodyWrapper>
                    <div className="tname">{i.courseId}</div>
                    <div>{i.courseSubDescribe}</div>
                    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                      {i.courseStuCnt}人在学
                    </div>
                  </CardBodyWrapper>
                </CardWrapper>
              </Badge.Ribbon>
            )
          })}
      </Flex>
      <h1>大家都在学</h1>
      <Unaccomplished>页面无设计 | 接口</Unaccomplished>
    </div>
  )
}

export default Course

import styled from 'styled-components'
const CardWrapper = styled.div`
  width: 200px;
  overflow: hidden;
  border-radius: 5px;
  color: var(--navy);
  height: 250px;
  margin-left: 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 300ms;
  &:hover {
    transform: translateY(-6px);
  }

  .magBtn {
    font-weight: bold;
    font-size: 0.5rem;
    position: absolute;
    top: 20px;
    right: -35px;
  }
`
const CardHeadWrapper = styled.div`
  height: 150px;
  margin: 0 auto;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
    height: 100%;
    transition: transform 500ms;
    &:hover {
      transform: scale(1.2);
    }
  }
`
const CardBodyWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center; */
  padding-top: 10px;
  padding-left: 10px;
  .ant-btn-primary {
    height: 30px;
    border-color: transparent;
  }
  .tname {
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 5px;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`
