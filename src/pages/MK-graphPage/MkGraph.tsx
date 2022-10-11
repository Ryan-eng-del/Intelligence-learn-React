import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import styled from 'styled-components'
import {
  getKnowPoint,
  setNodeStyle,
  HTMLToolTip,
  setCategories
} from './config'
import { useShowMG } from '../../server/fetchGraph/index'

export const MkGraph = () => {
  const { data } = useShowMG()

  useEffect(() => {
    const chartDom: any = document.getElementById('chart')
    const myChart = echarts.init(chartDom, 'dark')
    let maxLevel = -1
    data?.nodeData?.forEach((node: any) => {
      maxLevel = Math.max(node.category, maxLevel)
      setNodeStyle(node)
    })

    const categories = setCategories(maxLevel)

    const option: any = {
      tooltip: {
        formatter: function (param: any) {
          const [know, color] = getKnowPoint(param.data.level)
          return HTMLToolTip(color, know, param)
        }
      },
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut',
      legend: {
        show: true,
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
          zoom: 1,
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
    <>
      <KnowledgeGraphWrapper id={'chart'}></KnowledgeGraphWrapper>
    </>
  )
}
const KnowledgeGraphWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`
