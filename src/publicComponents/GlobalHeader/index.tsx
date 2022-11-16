import styled from 'styled-components'
import { Typography } from 'antd'

interface GlobalHeaderProps {
  title: string
  tool?: JSX.Element
}
export const GlobalHeader = (props: GlobalHeaderProps) => {
  return (
    <RightLayoutHeaderWrapper>
      <Typography.Title level={5}>{props.title}</Typography.Title>
      <HeaderToolWrapper>{props?.tool}</HeaderToolWrapper>
    </RightLayoutHeaderWrapper>
  )
}

const RightLayoutHeaderWrapper = styled.div`
  height: 80px;
  border-bottom: rgb(245, 245, 245) 2px solid;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
`

const HeaderToolWrapper = styled.div`
  display: flex;
  align-items: center;
`
