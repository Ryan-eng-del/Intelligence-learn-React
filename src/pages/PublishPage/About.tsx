import { Unaccomplished } from 'publicComponents/Unaccomplished'
import { lazy, Suspense } from 'react'
import styled from 'styled-components'
const Sample_Pro1 = lazy(() => import('components/Test/Sample_Pro1'))
const Sample_Pro2 = lazy(() => import('components/Test/Sample_Pro2'))

export default () => {
  return (
    <>
      <Unaccomplished>页面无设计 | 接口</Unaccomplished>
      <h1>针对特定领域的自动推导判题</h1>
      <Flex>
        <Suspense fallback={<></>}>
          <Sample_Pro2 />
        </Suspense>
        <Suspense fallback={<></>}>
          <Sample_Pro1 />
        </Suspense>
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
