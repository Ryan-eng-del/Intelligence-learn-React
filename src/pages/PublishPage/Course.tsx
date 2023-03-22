import { Carousel, Tag } from 'antd'
import classPicUrl from 'assets/img/class.jpg'

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
  return (
    <div>
      <Carousel afterChange={onChange} autoplay>
        <img src="https://gpnu.edu.cn/images/banner20_4.jpg" style={contentStyle} />
        <img src="https://gpnu.edu.cn/images/banner20_4.jpg" style={contentStyle} />
        <img src="https://gpnu.edu.cn/images/banner20_4.jpg" style={contentStyle} />
        <img src="https://gpnu.edu.cn/images/banner20_4.jpg" style={contentStyle} />
      </Carousel>
      <h1>为您推荐</h1>
      <Flex>
        {[
          { n: '课程名字', o: '其他描述', r: '推荐原因' },
          { n: '离散数学', o: '跨入数学的大门', r: '热门课程' }
        ].map((i) => (
          <CardWrapper key={i.n}>
            <CardHeadWrapper>
              <img src={classPicUrl} alt="课程图片" />
            </CardHeadWrapper>
            <CardBodyWrapper>
              <div className="tname">{i.n}</div>
              <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>{i.o}</div>
              <Tag color="red">{i.r}</Tag>
            </CardBodyWrapper>
          </CardWrapper>
        ))}
      </Flex>
      <h1>大家都在学</h1>
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
  margin-right: 40px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  .ant-btn-primary {
    height: 30px;
    border-color: transparent;
  }
  .tname {
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
