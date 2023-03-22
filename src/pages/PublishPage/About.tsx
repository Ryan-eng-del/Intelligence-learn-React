import { Sample_Pro1 } from 'components/Test/Sample_Pro1'
import { Sample_Pro2 } from 'components/Test/Sample_Pro2'
import styled from 'styled-components'
export default () => {
  return (
    <>
      <h1>针对特定领域的自动推导判题</h1>
      <Flex>
        <Sample_Pro2 />
        <Sample_Pro1 />
      </Flex>
      <h1>基于知识图谱的学习路线推荐</h1>
      这里绘制一个路径图
    </>
  )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`
