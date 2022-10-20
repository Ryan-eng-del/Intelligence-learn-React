import { ArrowLeftOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"

export const Title: React.FC<{paperName:string}> = (props) => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', height: 64 }}>
      <div style={{ color: '#0056D2', fontSize: 'large', fontFamily: 'sans-serif' }}
        onClick={() => navigate('/studentClassinfo/exam')}>
        {/* font-family: "Gill Sans", sans-serif; */}
        <ArrowLeftOutlined />
        返回
      </div>
      <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: 7, marginBottom: -10, lineHeight: 2, fontSize: 'large', fontFamily: 'sans-serif' }}>{props.paperName}</div>
        <div style={{ marginTop: -7, lineHeight: 2, fontSize: 'medium', fontFamily: 'sans-serif' }}>时间总分</div>
      </div>
    </div>
  )
}