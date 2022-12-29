import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { Button, message, Modal, Select } from 'antd'
import { QuestionTitleArea } from '../../QuestionTitleArea/QuestionTitleArea'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { useShowKnowledgeTree } from 'server/fetchKnowledge'
import { TreeSelected } from '../../../components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { useCheckKnowledgeTreeUI } from '../../../hook/useKnowledge/useCheckKnowledgeTreeUI'
import { chapterReducer, initialChapterState } from 'reducer/ChaperStudyTree/chapterReducer'
import { generateKnowledgeKeys } from '../../../helper/knowledgeTree'
import { useHandleOnExpand } from '../../../hook/useChapterStudy/useHandleTreeOnExpand'
import { BaseSpin } from '../../../baseUI/BaseSpin/BaseSpin'
import { GlobalLabel } from '../../GlobalLabel/globalLabel'
import { useHandleUploadExamPaper } from '../../../hook/useQuestionFooter/useHandleUploadExamPaper'
import { StateSetter } from '../../../types'
import { isCouldSaveQuestion } from './util'
import styled from 'styled-components'
import { SingleChoicePreview } from './SingleChoice/SingleChoicePreview'
import { useCurrentClassInfo } from 'context/ClassInfoContext'

const { Option } = Select

interface QuestionFooterProps {
  question: IQuestionType
  setCurEditQuestion: StateSetter<IQuestionType|undefined>
}

export const QuestionFooter = (props: QuestionFooterProps) => {
  const { question, setCurEditQuestion } = props
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading: KnowledgeTreeLoading } = useShowKnowledgeTree(classInfo.courseId)
  const { checkTreeData } = useCheckKnowledgeTreeUI(data)
  /* 两个弹框的开闭状态 */
  const [isModalOpen, setIsModalOpen] = useState(false)
  /* 知识点选择树的UI层 */
  const [chapterTreeState, dispatch] = useReducer(chapterReducer, initialChapterState)
  /* 处理树的受控展开 */
  const { handleOnExpand } = useHandleOnExpand(dispatch)
  /* 难度数组 */
  const optionDifficulty = useMemo(() => ['简单', '容易', '困难'], [])

  /* 树的展开 */
  useEffect(() => {
    dispatch({
      type: 'setExpandKeys',
      expandKeys: () => generateKnowledgeKeys(data)
    })
  }, [data])
  /* 处理预览试卷 */
  const handlePreviewPaper = () => {
    const { isError, msg } = handleFormDataIsValid()
    if (!isError) {
      setIsModalOpen(true)
    } else {
      message.warning(msg, 0.5)
    }
  }
  /* 处理试题表单校验 */
  const handleFormDataIsValid = useCallback(() => {
    /* 检测表单选项进行提示 */
    const { isError, message: msg } = isCouldSaveQuestion(question)
    return { isError, msg }
  }, [question])

  /* 处理保存试题 */
  const handleSaveQuestion = () => {
    const { isError, msg } = handleFormDataIsValid()
    if (!isError) {
      setIsSaveModalOpen(true)
    } else {
      message.warning(msg, 0.5)
    }
  }

  /* 处理上传试卷 */
  const {
    handleChange,
    handleRelateCheck,
    curDifficulty,
    curCheckId,
    isSaveModalOpen,
    handleOk,
    setIsSaveModalOpen,
    isLoading
  } = useHandleUploadExamPaper(question, setCurEditQuestion)

  /* 编辑题目解析 */
  const handleQuestionAnswerExplain = (content: string) => {
    question.questionAnswerExplain = content
  }

  return (
    <>
      <Modal title={'试题预览'} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
        <QuestionTitleWrapper>{question.questionDescription}</QuestionTitleWrapper>
        <SingleChoicePreview question={question} />
      </Modal>
      <Modal title="保存题目" visible={isSaveModalOpen} onOk={handleOk} onCancel={() => setIsSaveModalOpen(false)}>
        <GlobalLabel>选择难易度：</GlobalLabel>
        <Select style={{ width: 120 }} onChange={handleChange} value={String(curDifficulty)}>
          {optionDifficulty.map((optionDiff, index) => {
            return (
              <Option key={optionDiff} value={String(index)}>
                {optionDiff}
              </Option>
            )
          })}
        </Select>

        <GlobalLabel style={{ margin: '20px 0 12px 0' }}>题目关联知识点:</GlobalLabel>
        <div style={{ position: 'relative', minHeight: '300px' }}>
          {KnowledgeTreeLoading ? (
            <BaseSpin title={'加载知识点中'} size={'default'} />
          ) : (
            <TreeSelected
              checkTreeData={checkTreeData}
              curCheckId={curCheckId}
              relateKeys={chapterTreeState.expandKeys}
              handleRelateCheck={handleRelateCheck}
              handleRelateExpand={handleOnExpand}
            />
          )}
        </div>
      </Modal>

      <QuestionTitleArea
        question={question}
        handleEdit={handleQuestionAnswerExplain}
        label={'解析'}
        questionOf={'questionAnswerExplain'}
      />
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={() => handleSaveQuestion()}
          size="large"
          htmlType="submit"
          type="primary"
          style={{ marginRight: '20px' }}
          loading={isLoading}
        >
          保存试题
        </Button>
        <Button onClick={() => handlePreviewPaper()} size="large" type="primary">
          预览试题
        </Button>
      </div>
    </>
  )
}
export const QuestionTitleWrapper = styled.div`
  font-size: 17px;
  margin-bottom: 25px;
`
export const OptionPreviewWrapper = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 35px;
  background-color: rgb(245, 245, 245);
  text-align: center;
`
