import React from 'react'
import { IChapterReducerAction, IChapterReducerState } from 'reducer/ChaperStudyTree/type/type'

export interface ChapterTreeData {
  chapterOrder: number
  childChapters: ChildChapter[]
  courTimes: CourTime[]
  id: string
  name: string
  pid: string
}

export interface IHandleChapterControl<T> {
  data: T[]
  chapterState: IChapterReducerState
  dispatchChapter: React.Dispatch<IChapterReducerAction>
}

export interface ChapterInitNode {
  chapterOrder: number
  childChapters: []
  courTimes: []
  id: string
  name: string
  pid: string
}

export interface ClassTimeInitNode {
  classTimeId: string
  resource: Resource[]
  name: string
  paperId: string
  paperName: string
  chapterId: string
}

export interface ChildChapter {
  chapterOrder: number
  childChapters: ChildChapter[]
  courTimes: CourTime[]
  id: string
  name: string
  pid: string
}

export interface CourTime {
  chapterId: string
  classTimeId: string
  name: string
  paperId: string
  paperName: string
  resource: Resource[]
}

export interface Resource {
  resourceId: string
  sourceLink: string
  resourceName: string
  type: number
}
