import * as echarts from 'echarts'

const oneStyle = {
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
}

const twoStyle = {
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
}
const threeStyle = {
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
}
const fourStyle = {
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
}
const defaultStyle = {
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
}
export const CategoryMap = new Map()
CategoryMap.set(1, oneStyle)
CategoryMap.set(2, twoStyle)
CategoryMap.set(3, threeStyle)
CategoryMap.set(4, fourStyle)
CategoryMap.set('defalut', defaultStyle)
export const CategoryMap2 = new Map()
CategoryMap2.set('未掌握', oneStyle)
CategoryMap2.set('掌握', fourStyle)
CategoryMap2.set('熟练掌握', threeStyle)

export { oneStyle, threeStyle, twoStyle, fourStyle, defaultStyle }
