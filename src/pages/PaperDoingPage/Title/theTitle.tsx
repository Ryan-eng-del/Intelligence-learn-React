import { ArrowLeftOutlined } from '@ant-design/icons'
import { Statistic } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Title: React.FC<{
  paperName: string
  num: number
  time: number
  score: number
}> = (props) => {
  const navigate = useNavigate()
  const { classInfo } = useCurrentClassInfo()
  return (
    <div style={{ display: 'flex', height: 64 }}>
      <div
        style={{
          color: '#0056D2',
          fontSize: 'large',
          fontFamily: 'sans-serif'
        }}
        onClick={() => navigate(`/MyStudy/${classInfo.courseId}/exam`)}
      >
        {/* font-family: "Gill Sans", sans-serif; */}
        <ArrowLeftOutlined />
        返回
      </div>
      <div style={{display: 'flex', flexDirection: 'row',alignItems:"center", justifyContent:"space-around" }} >
        <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column' }} >
          <div
            style={{
              marginTop: 2,
              marginBottom: -10,
              lineHeight: 2,
              fontSize: 'large',
              fontFamily: 'sans-serif'
            }}
          >
            <b>{props.paperName}</b>
          </div>
          <div
            style={{
              marginTop: -2,
              lineHeight: 2,
              fontSize: 'small',
              fontFamily: 'sans-serif'
            }}
          >
            {`共${props.num}题，${props.score}分。`}
          </div>
        </div>
        <Statistic.Countdown value={Date.now()} title="时间" format="mm:ss"/>
      </div>

    </div>
  )
}
