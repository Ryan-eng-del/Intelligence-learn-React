import React from 'react'
import { ShowDetailsCellProps } from 'components/QuestionBankPage/type'
import { QuestionItemWrapper } from '../QuestionBankTableStyle'

export const ShowDetailsCell: React.FC<ShowDetailsCellProps> = ({
  editing,
  record,
  children,
  ...restProps
}) => {
  //网络请求回来对应数据
  return (
    <td {...restProps}>
      {editing ? (
        <QuestionItemWrapper>
          题目：{record.question}
          <br />
          {/* 需要处理 */}
          选项：{record.questionOption}
          <br />
          正确答案：{record.rightAnswer}
          <br />
        </QuestionItemWrapper>
      ) : (
        children
      )}
    </td>
  )
}
