import { Skeleton } from 'antd'
import styled from 'styled-components'

const Skeletons = (props: { size: 'middle' | 'small' | 'large'; width?: string; height?: string }) => {
  const len = props.size === 'middle' ? 1 : 2

  return (
    <SkeletonWrapper>
      {Array.from({ length: len }).map((_, i) => {
        return (
          <Skeleton
            active={true}
            round={true}
            key={i}
            paragraph={{ rows: props.size === 'middle' ? 13 : props.size === 'large' ? 20 : 5 }}
            style={{
              width: props.size === 'small' ? '400px' : '800px',
              marginTop: '50px',
              padding: '40px'
            }}
          />
        )
      })}
    </SkeletonWrapper>
  )
}

const SkeletonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`
export default Skeletons
