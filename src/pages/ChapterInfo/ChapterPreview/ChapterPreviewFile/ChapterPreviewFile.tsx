import React from 'react'
import { ChapterPreviewFileWrapper } from './ChapterPreviewFileStyle'
import { PageHeader } from 'antd'
import { useNavigate } from 'react-router-dom'

export const ChapterPreviewFile: React.FC = () => {
  const navigator = useNavigate()
  return (
    <>
      <ChapterPreviewFileWrapper>
        <PageHeader
          onBack={() => navigator(-1)}
          title="Introduction to Graph Theory"
          subTitle="This is a subtitle"
        />
        <embed
          type="application/pdf"
          title="Embedded PDF"
          src="https://ocw.mit.edu/courses/1-022-introduction-to-network-models-fall-2018/815fc00a3c8992d43c42a513a268709c_MIT1_022F18_lec2.pdf"
          style={{ overflow: 'auto', width: '100%', height: '100vh' }}
        />
      </ChapterPreviewFileWrapper>
    </>
  )
}
