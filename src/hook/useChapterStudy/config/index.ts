import { ChapterInitNode, ClassTimeInitNode } from '../type'

export const ChapterNode: ChapterInitNode = {
  id: '-1',
  name: '新建节点',
  chapterOrder: 1,
  courTimes: [],
  childChapters: [],
  pid: ''
}
export const ClassTimeNode: ClassTimeInitNode = {
  classTimeId: '-1',
  name: '',
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
      const name: string[] = []
      setFileList([...fileList, file])
      fileList.forEach((f: any) => {
        name.push(f.name + f.size)
      })
      return false
    },
    fileList
  }
}
