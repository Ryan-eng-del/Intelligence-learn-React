import React from 'react'
import { ChapterPreviewFileWrapper } from './ChapterPreviewFileStyle'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const ChapterPreviewFile: React.FC = () => {
  const navigator = useNavigate()
  return (
    <>
      <ChapterPreviewFileWrapper>
        <Button
          type="text"
          shape="round"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigator(-1)}
        />
        <h1 style={{ display: 'inline' }}>Introduction to Graph Theory</h1>
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
