import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import styled from 'styled-components'
import { setNodeStyle } from './config'
import { useShowKG } from '../../server/fetchGraph/index'
import { setCategories2 } from './config/index'
import { useNavigate, useParams } from 'react-router-dom'
import { useComputedRoute } from '../../util/computedRoute'
import { PrimaryButton } from '../../publicComponents/Button'

export const KnowledgeGraph = () => {
  const courseId = useParams().id!
  const { data } = useShowKG(courseId)
  const computedPath = useComputedRoute('k-graph')
  const navigate = useNavigate()
  useEffect(() => {
    const chartDom: any = document.getElementById('chart')
    const myChart = echarts.init(chartDom, 'dark')
    let maxLevel = -1
    data?.nodeData?.forEach((node: any) => {
      maxLevel = Math.max(node.category, maxLevel)
      setNodeStyle(node)
    })
    const categories = setCategories2(maxLevel)
    const option: any = {
      tooltip: {
        formatter: function (param: any) {
          return `
         ${param.name}`
        }
      },
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut',
      legend: {
        show: true,
        selectedMode: false, //开启关闭点击图例
        orient: 'vertical',
        icon: 'circle',
        padding: 20,
        itemGap: 20,
        backgroundColor: '#1F2D3C',
        borderRadius: 8,
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        },
        left: 30,
        bottom: 30
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          focusNodeAdjacency: true,
          roam: true,
          zoom: 0.6,
          draggable: true,
          force: {
            repulsion: 1500,
            layoutAnimation: true,
            gravity: 0.1,
            edgeLength: 180
          },
          edgeSymbol: ['none', 'arrow'],
          categories: categories,
          data: data?.nodeData || [],
          links: data?.linkData || [],
          lineStyle: {
            opacity: 1,
            width: 1,
            color: 'source'
          },
          emphasis: {
            focus: 'adjacency'
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [data])
  return (
    <Kw>
      <KnowledgeGraphWrapper id={'chart'}></KnowledgeGraphWrapper>
      <PrimaryButton
        title={'返回'}
        style={{ position: 'absolute', top: 69, left: 31, zIndex: 1 }}
        handleClick={() => navigate(`${computedPath}knowledge`)}
      ></PrimaryButton>
    </Kw>
  )
}
const Kw = styled.div`
  height: 100%;
  min-height: 750px;
`

const KnowledgeGraphWrapper = styled.div`
  width: 100%;
  min-height: 750px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`
