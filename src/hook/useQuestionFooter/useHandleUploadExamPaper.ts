/*处理上传试卷*/
import { useCallback, useEffect, useState } from 'react'
import { IQuestionType } from '../../reducer/CreateExamPaper/type/type'
import { useCreateQuestion } from '../../server/fetchExam'
import { StateSetter } from '../../types'
import { GlobalMessage } from '../../publicComponents/GlobalMessage'

export const useHandleUploadExamPaper = (
  question: IQuestionType,
  setCurEditQuestion: StateSetter<IQuestionType | null>
) => {
  /*关联的知识点*/
  const [curCheckId, setCurCheckId] = useState<string[]>([])
  /*当前难度*/
  const [curDifficulty, setCurDifficulty] = useState('0')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  /*上传试题Api*/
  const { mutateAsync: uploadPaperApi, isLoading } = useCreateQuestion()

  /*初始化试题状态*/
  useEffect(() => {
    setCurCheckId(question.pointIds)
    setCurDifficulty(String(question.questionDifficulty))
  }, [question.questionId])

  /*处理难度的选择*/
  const handleChange = useCallback(
    (value: string) => {
      setCurDifficulty(value)
      question.questionDifficulty = Number(value)
    },
    [question]
  )

  /*选择树来触发*/
  const handleRelateCheck = useCallback(
    (checkInfo: any) => {
      const { checked } = checkInfo
      setCurCheckId(checked)
      question.pointIds = checked
    },
    [question]
  )
  /*处理上传试卷*/
  const handleOk = async () => {
    const result: any = {}
    for (const k in question) {
      if (k !== 'isStore') {
        result[k] = question[k as keyof IQuestionType]
      }
    }

    try {
      setIsSaveModalOpen(false)
      const id = await uploadPaperApi({ ...result })
      question.questionId = id
      question.isStore = true
      setCurEditQuestion({ ...question })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    handleChange,
    handleRelateCheck,
    curDifficulty,
    curCheckId,
    handleOk,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isLoading
  }
}
