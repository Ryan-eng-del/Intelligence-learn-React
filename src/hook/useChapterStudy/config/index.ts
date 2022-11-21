import { ChapterInitNode, ClassTimeInitNode } from '../type'

export const ChapterNode: ChapterInitNode = {
  id: Math.random() * 1000 + Math.random() * 10 + '',
  name: '新建节点',
  chapterOrder: 1,
  courTimes: [],
  childChapters: [],
  pid: ''
}
export const ClassTimeNode: ClassTimeInitNode = {
  classTimeId: Math.random() * 1000 + Math.random() * 10 + '',
  name: '新建节点',
  resource: [],
  paperName: '',
  paperId: '',
  chapterId: ''
}

export const uploadProps = (fileList: any, setFileList: any) => {
  return {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file])
      return false
    },
    fileList
  }
}
