import React from 'react'
import { useMount } from '../../hook/useMount'
import * as echarts from 'echarts'
import { linkData, nodeData } from './data/chartData'
import {
  labelSize,
  oneSizeTop01,
  oneSizeTop1,
  threeSizeTop01,
  threeSizeTop1,
  twoSizeTop01,
  twoSizeTop1
} from './config/labelSize'
import styled from 'styled-components'

export const KnowledgeGraph = () => {
  useMount(() => {
    const chartDom: any = document.getElementById('chart')
    const myChart = echarts.init(chartDom, 'dark')

    const option: any = {
      tooltip: {
        formatter: function (param: any) {
          return param.data.name
        }
      },
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut',
      legend: {
        show: true,
        selectedMode: false, //开启关闭点击图例
        data: [
          '课程名',
          '一级知识点',
          '二级知识点',
          '三级知识点',
          '四级知识点',
          '五级知识点'
        ],
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
          itemStyle: {
            normal: {
              color: '#FFFFFF',
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 20
            }
          },
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              fontSize: 14,
              color: '#ffffff',
              position: 'right',
              lineHeight: 18
            }
          },
          categories: [
            {
              name: '课程名',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#FFB47F'
                  },
                  {
                    offset: 1,
                    color: '#FA8674'
                  }
                ]),
                borderColor: 'rgba(255,183,157,.3)',
                borderWidth: 15
              },
              label: labelSize(oneSizeTop1, oneSizeTop01),
              symbolSize: '130'
            },
            {
              name: '一级知识点',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#91DEF0'
                  },
                  {
                    offset: 1,
                    color: '#58A9DC'
                  }
                ]),
                borderColor: 'rgba(112,198,255,.3)',
                borderWidth: 8
              },
              label: labelSize(twoSizeTop1, twoSizeTop01),
              symbolSize: '84'
            },
            {
              name: '二级知识点',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#6CBFFF'
                  },
                  {
                    offset: 1,
                    color: '#3A8BFF'
                  }
                ]),
                borderColor: 'rgba(58,139,255,.3)',
                borderWidth: 6
              },
              label: labelSize(threeSizeTop1, threeSizeTop01),
              symbolSize: '68'
            },
            {
              name: '三级知识点',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2FEBDD'
                  },
                  {
                    offset: 1,
                    color: '#15D2B9'
                  }
                ]),
                borderColor: 'rgba(21,210,185,.3)',
                borderWidth: 5
              },
              symbolSize: '20'
            },
            {
              name: '四级知识点',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#F2E984'
                  },
                  {
                    offset: 1,
                    color: '#E1CF4D'
                  }
                ]),
                borderColor: 'rgba(225,207,77,.3)',
                borderWidth: 4
              },
              symbolSize: '12'
            },
            {
              name: '五级知识点'
            }
          ],
          data: nodeData,
          links: linkData,
          lineStyle: {
            normal: {
              opacity: 1,
              width: 1,
              color: 'source'
            }
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 2
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  })
  return <KnowledgeGraphWrapper id={'chart'}></KnowledgeGraphWrapper>
}
const KnowledgeGraphWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`
