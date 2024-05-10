import { Button, Input, Radio } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import { forwardRef, useEffect, useState } from 'react'
import { QuestionBank } from 'server/fetchExam/types'
import { QuestionBankHeaderWrapper, SelectiveList } from '../QuestionBankHeader/QuestionBankHeaderStyle'
import { TotalQuestionWrapper } from '../QuestionBankTable/QuestionBankTableStyle'
type Props = {
  dataLen: number
  clickfilter: (cb: (item: QuestionBank) => boolean) => void
  wrong?: (i: boolean) => void
}
export const QuestionBankHeader = forwardRef((props: Props, ref) => {
  const { clickfilter, dataLen, wrong } = props
  const { paperNameMap, paperMap } = usePaperMap()
  const [curType, setType] = useState(-1)
  const [curKind, setKind] = useState('all')
  const [value, setValue] = useState('')

  const Filter = () =>
    clickfilter((item) => {
      if (curType != -1 && item.questionType != curType) return false
      // 后期有标注错题。收藏字段传入这里
      return value == '' ? true : item.questionDescription.indexOf(value) !== -1
    })
  useEffect(Filter, [value, curKind, curType])
  useEffect(() => {
    wrong!(curKind == 'wrong')
  }, [curKind])

  const Kinds = [
    { id: 'all', name: '所有' },
    { id: 'wrong', name: '错题', ref },
    // { id: 'collect', name: '收藏' }
  ]
  return (
    <>
      <QuestionBankHeaderWrapper>
        {/* 题型、知识点管理 */}
        <SelectiveList>
          <span className="introduce">题目类型:</span>
          <Radio.Group defaultValue="all">
            <Button
              type={curType == -1 ? 'primary' : 'default'}
              value="all"
              className="choosebtn"
              onClick={() => setType(-1)}
            >
              所有
            </Button>
            {paperMap.map((item, index) => (
              <Button
                key={index}
                value={index}
                className="choosebtn"
                type={curType == index ? 'primary' : 'default'}
                onClick={() => setType(index)}
              >
                {paperNameMap[index]}
              </Button>
            ))}
          </Radio.Group>
          <Input.Search allowClear size="large" onSearch={setValue} style={{ width: '400px' }} />
        </SelectiveList>
        <SelectiveList style={{ justifyContent: 'start' }}>
          <span className="introduce">选择类别:</span>&nbsp;&nbsp;&nbsp;
          <Radio.Group defaultValue="all">
            {Kinds.map((kind) => (
              <Button
                type={curKind == kind.id ? 'primary' : 'default'}
                className="choosebtn"
                key={kind.id}
                ref={kind.ref as React.Ref<HTMLElement>}
                onClick={() => setKind(kind.id)}
              >
                {kind.name}
              </Button>
            ))}
          </Radio.Group>
          <TotalQuestionWrapper>共计{dataLen}题</TotalQuestionWrapper>
        </SelectiveList>
      </QuestionBankHeaderWrapper>
    </>
  )
})
