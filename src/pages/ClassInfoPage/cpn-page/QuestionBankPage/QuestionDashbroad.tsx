import { CaretDownOutlined, OrderedListOutlined, SnippetsOutlined, ZoomInOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import React from 'react'
import { ActionWapper, DashbroadWapper } from './QuestionBankPageStyle'

export const QuestionDashbroad: React.FC<{
  TargetRef: React.MutableRefObject<HTMLDivElement | null>
  move: () => any
  selectPoint: () => any
}> = ({ TargetRef, move, selectPoint }) => {
  return (
    <DashbroadWapper ref={TargetRef}>
      <div className="processWapper" onClick={move}>
        <Progress
          percent={60}
          strokeColor={'#90EE90'}
          success={{ percent: 2, strokeColor: '#FA8072' }}
          strokeWidth={20}
          width={300}
          type="circle"
          strokeLinecap="butt"
          format={(precent, successPercent) => (
            <div className="text">
              已完成{precent}题<br />
              错误{successPercent}题<br />
              <CaretDownOutlined className="jumpIcon" />
            </div>
          )}
        />
      </div>
      <ActionWapper>
        <Unaccomplished>做题功能不可用</Unaccomplished>
        <Unaccomplished>智能推荐无接口</Unaccomplished>
        <div className="action">
          <SnippetsOutlined /> &nbsp; 重练错题
        </div>
        <div className="action" onClick={selectPoint}>
          <ZoomInOutlined />
          &nbsp; 智能推荐
        </div>
        <div className="action" onClick={move}>
          <OrderedListOutlined />
          &nbsp; 顺序刷题
        </div>
      </ActionWapper>
    </DashbroadWapper>
  )
}
