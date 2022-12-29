import styled from 'styled-components'
import { Breadcrumb, Space } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

interface GlobalHeaderProps {
  title: string

  tool?: JSX.Element | boolean
}

export const GlobalHeader = (props: GlobalHeaderProps) => {
  const prefix = useParams()
  return (
    <RightLayoutHeaderWrapper>
      <Breadcrumb separator="/">
        <Breadcrumb.Item href="/home/teach">
          <HomeOutlined />
        </Breadcrumb.Item>
        {prefix.identify
        ? prefix.identify == "MyTeach"
          ? <Breadcrumb.Item> 我教的课 </Breadcrumb.Item>
          : <Breadcrumb.Item> 我学的课 </Breadcrumb.Item>
        : <></>}
        <Breadcrumb.Item>
          <b>{props.title}</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <HeaderToolWrapper>{props?.tool}</HeaderToolWrapper>
    </RightLayoutHeaderWrapper>
  )
}

const RightLayoutHeaderWrapper = styled.div`
  height: 80px;
  border-bottom: rgb(230, 230, 230) 2px solid;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  z-index: 500;
  background-color: white;
`

const HeaderToolWrapper = styled.div`
  display: flex;
  align-items: center;
`
