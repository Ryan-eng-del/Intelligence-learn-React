import { useMemo } from 'react'
import { StudentPaper, StudentPaperItem } from 'server/fetchExam/types'
import { usePaperMap } from './usePaperMap'

export interface ExamPaper {
  single: StudentPaperItem[]
  multiple: StudentPaperItem[]
  fillBank: StudentPaperItem[]
  shortAnswer: StudentPaperItem[]
  judge: StudentPaperItem[]
}

export const useExamQsData = (PaperData: StudentPaper | undefined): ExamPaper => {
  const { paperMap } = usePaperMap()

  return useMemo(() => {
    const init = {
      single: [],
      multiple: [],
      fillBank: [],
      shortAnswer: [],
      judge: []
    }
    if (!PaperData) return init
    return PaperData?.questionOfPaperVOS?.reduce<Record<keyof ExamPaper, StudentPaperItem[]>>((pre, now) => {
      pre[paperMap[now.questionType] as keyof ExamPaper] =
        pre[paperMap[now.questionType] as keyof ExamPaper].concat(now)
      return pre
    }, init)
  }, [PaperData])
}
