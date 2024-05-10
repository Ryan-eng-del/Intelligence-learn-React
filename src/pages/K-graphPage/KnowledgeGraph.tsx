import { Button } from 'antd'
import * as echarts from 'echarts'
import { PrimaryButton } from 'publicComponents/Button'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowKG } from 'server/fetchGraph/index'
import styled from 'styled-components'
import { useComputedRoute } from 'util/computedRoute'
import { findPath, setNodeStyle } from './config'
import { setCategories2 } from './config/index'

const KnowledgeGraph = () => {
  const courseId = useParams().id!
  const { data, isSuccess: KGisSuccess } = useShowKG(courseId)
  const computedPath = useComputedRoute('k-graph')
  const navigate = useNavigate()

  useEffect(() => {
    const chartDom: any = document.getElementById('chart')
    const myChart = echarts.init(chartDom, 'dark')
    let maxLevel = -1
    //对获取到的所有node: 获得最深的层级; 对获得的node节点根据层级进行初始化样式设置
    data?.nodeData?.forEach((node: any) => {
      maxLevel = Math.max(node.category, maxLevel)
      setNodeStyle(node)
    })

    //根据层级的数量,设置层级的样式
    const categories = setCategories2(maxLevel)
    const option: any = {
      //鼠标悬停时出现的提示框
      tooltip: {
        //每个节点都会进行一此设置渲染
        formatter: function (param: any) {
          return `
         ${param.name}`
        }
      },

      animationDuration: 2000, //初始动画的时长
      animationEasing: 'quinticInOut', //初始动画的缓动效果
      animationEasingUpdate: 'quinticInOut', //数据更新动画的缓动效果。
      legend: {
        //图例组件,(左下角的什么颜色代表几级标题的玩意)
        show: true, //是否展示
        selectedMode: true, //开启关闭点击图例
        orient: 'vertical', //排列方向 :horizontal'水平',vertical'垂直'
        icon: 'circle',
        padding: 20,
        itemGap: 20, //图例每项之间的间隔
        backgroundColor: '#1F2D3C',
        borderRadius: 8,
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        },
        left: 30,
        bottom: 30
      },
      series: {
        type: 'graph',
        layout: 'force', //采用力引导布局 这就是为什么每个点能乱动
        focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
        roam: true, //是否开启鼠标缩放和平移漫游
        zoom: 0.7, //当前视角的缩放比例
        draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
        force: {
          repulsion: 2500, //节点之间的斥力因子。
          layoutAnimation: true, //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画
          gravity: 0.3, //节点受到的向中心的引力因子
          edgeLength: 200 //边的两个节点之间的距离，这个距离也会受 repulsion。
        },
        edgeSymbol: ['none', 'arrow'], //边两端的标记类型，可以是一个数组分别指定两端[头,尾]，也可以是单个统一指定
        categories: categories, //节点分类的类目
        data: data?.nodeData || [],
        links: data?.linkData || [], //理解为线,谁连谁[source,target]
        lineStyle: {
          opacity: 1,
          width: 1,
          color: 'source'
        },
        emphasis: {
          //高亮的图形样式。
          focus: 'adjacency'
        }
      }
    }
    myChart.setOption(option)
    myChart.on('click', (e) => {
      const tampOption = JSON.parse(JSON.stringify(option))
      tampOption.series.links = findPath(e.data, data.linkData)
      myChart.setOption(tampOption)
      button!.style.display = 'initial'
    })
    const button = document.getElementById('recover')
    button!.addEventListener('click', (e) => {
      myChart.setOption(option)
      button!.style.display = 'none'
    })
  })

  return (
    <>
      <KnowledgeGraphWrapper id={'chart'}></KnowledgeGraphWrapper>
      <PrimaryButton
        title={'返回'}
        style={{ position: 'absolute', top: 10, left: 31, zIndex: 1 }}
        handleClick={() => navigate(`${computedPath}knowledge`)}
      ></PrimaryButton>

      <Button id={'recover'} style={{ width: 80, position: 'absolute', top: 10, left: 180, display: 'none' }}>
        复原
      </Button>
      {/* myChart.setOption(option) */}
    </>
  )
}

const KnowledgeGraphWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  transform: translateZ(0);
`

export default KnowledgeGraph
