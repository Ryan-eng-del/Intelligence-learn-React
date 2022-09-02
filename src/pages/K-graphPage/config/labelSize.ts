import { nodeData } from '../data/chartData'

export const oneSizeTop1 = {
  normal: {
    show: true,
    fontSize: 28,
    lineHeight: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'inside',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}
export const oneSizeTop01 = {
  normal: {
    show: true,
    fontSize: 24,
    lineHeight: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'right',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}
export const twoSizeTop1 = {
  normal: {
    show: true,
    fontSize: 18,
    lineHeight: 30,
    color: '#FFFFFF',
    position: 'inside',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}
export const twoSizeTop01 = {
  normal: {
    show: true,

    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    position: 'right',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}
export const threeSizeTop1 = {
  normal: {
    show: true,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    position: 'inside',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}
export const threeSizeTop01 = {
  normal: {
    show: true,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    position: 'right',
    formatter: function (val: any) {
      const strs = val.name.split('') //字符串数组
      let str = ''
      let cutoffNumber = 12
      for (let i = 0, s; (s = strs[i++]); ) {
        //遍历字符串数组
        str += s
        cutoffNumber++
        if (strs.length > 5) {
          if (!(i % 4)) str += '\n' //按需要求余
        }
      }
      cutoffNumber = cutoffNumber > 14 ? 14 : cutoffNumber
      return str.length > cutoffNumber ? str.slice(0, cutoffNumber) + '…' : str
    }
  }
}

export function labelSize(one: any, two: any) {
  let countOne = 0,
    countTwo = 0,
    countThree = 0,
    countFour = 0,
    normal
  for (let i = 0; i < nodeData.length; i++) {
    if (nodeData[i].category == 1) {
      countOne++
      if (countOne > 10 || countTwo > 20 || countThree > 20 || countFour > 20) {
        normal = two
      } else {
        normal = one
      }
    } else if (nodeData[i].category == 2) {
      countTwo++
      if (countOne > 10 || countTwo > 20 || countThree > 20 || countFour > 20) {
        normal = two
      } else {
        normal = one
      }
    } else if (nodeData[i].category == 3) {
      countThree++
      if (countOne > 10 || countTwo > 20 || countThree > 20 || countFour > 20) {
        normal = two
      } else {
        normal = one
      }
    } else if (nodeData[i].category == 4) {
      countFour++
      if (countOne > 10 || countTwo > 20 || countThree > 20 || countFour > 20) {
        normal = two
      } else {
        normal = one
      }
    }
  }
  return normal
}
