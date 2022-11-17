import React from 'react'
import { ShowDetailsCellProps } from 'components/QuestionBankPage/type'
import { QuestionDetailsWrapper } from '../QuestionBankTableStyle'

export const ShowDetailsCell: React.FC<ShowDetailsCellProps> = ({ editing, record, children, ...restProps }) => {
  // 网络请求回来对应数据
  return (
    <td {...restProps}>
      {editing ? (
        <QuestionDetailsWrapper>
          题目：{record.question}
          <br /> <br />
          {/* 需要处理 */}
          {record.questionOption === '' ? (
            <></>
          ) : (
            <>
              选项：
              <br />
              {record.questionOption.split('<>').map((item, index) => (
                <span key={index}>
                  {item}
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          正确答案：
          {record.rightAnswer.split('#').map((item, index) => (
            <span key={index}>{item}&nbsp;&nbsp;</span>
          ))}
        </QuestionDetailsWrapper>
      ) : (
        children
      )}
    </td>
  )
}
