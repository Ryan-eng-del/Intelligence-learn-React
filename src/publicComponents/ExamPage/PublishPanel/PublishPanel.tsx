import { Radio } from 'antd'

import React, { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { ExamOption } from './ExamOption'
import { HomeworkOption } from './HomeworkOption'
import { PublishTypeWrapper } from './style'

type Props = {
  handlePublishOption: (publishOption: any) => void
}
export const PublishPanel: React.FC<Props> = ({ handlePublishOption }) => {
  const [publishType, setpublishType] = useState(0)
  const [isAllowRedo, setIsAllowRedo] = useState(false)
  const initialState = {
    type: 0
  }
  const [publishOption, setPublishOption] = useImmer(initialState)

  useEffect(() => {
    handlePublishOption(publishOption)
  }, [publishOption])

  const onRdioChange = (e: any) => {
    setpublishType(e.target.value)
    initialState.type = e.target.value
    setPublishOption(initialState)
  }

  return (
    <PublishTypeWrapper>
      <div style={{ margin: '12px 0' }}>
        <span>发布类型：</span>
        <Radio.Group onChange={onRdioChange}>
          <Radio value={0}>试卷</Radio>
          <Radio value={1}>作业</Radio>
        </Radio.Group>
      </div>
      {publishType === 0 ? (
        <ExamOption publishOption={publishOption} setPublishOption={setPublishOption} />
      ) : (
        <HomeworkOption
          publishOption={publishOption}
          setPublishOption={setPublishOption}
          isAllowRedo={isAllowRedo}
          setIsAllowRedo={setIsAllowRedo}
        />
      )}
    </PublishTypeWrapper>
  )
}
