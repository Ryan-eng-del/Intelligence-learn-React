import { ArrowLeftOutlined } from "@ant-design/icons"
import React from "react"

export const Title: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: 64 }}>
      <div style={{ color: '#0056D2', fontSize: 'large', fontFamily: 'sans-serif' }}>
        {/* font-family: "Gill Sans", sans-serif; */}
      <ArrowLeftOutlined />
        返回
      </div>
      <div style={{ paddingLeft:20,display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop:7,marginBottom:-10,lineHeight: 2, fontSize: 'large', fontFamily: 'sans-serif'}}>考试名称</div>
        <div style={{ marginTop:-7,lineHeight: 2, fontSize: 'medium', fontFamily: 'sans-serif' }}>作业时间总分</div>
      </div>
    </div>
  )
}