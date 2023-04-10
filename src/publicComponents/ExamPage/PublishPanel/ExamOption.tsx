import { Collapse, InputNumber, Switch, TimePicker } from 'antd'
import React from 'react'

const { Panel } = Collapse

export const ExamOption: React.FC<{
  publishOption: any
  setPublishOption: any
}> = ({ publishOption, setPublishOption }) => {
  const translateTimeToNumber = (time: string) => {
    const timearr = time.split(':')
    return parseInt(timearr[0]) * 60 + parseInt(timearr[1])
  } //用来将时间转化为分钟
  return (
    <>
      <div>
        <span className="bl">考试限时:</span>
        <InputNumber
          size="large"
          min={1}
          max={100000}
          defaultValue={publishOption.limitTime}
          onChange={(value) => {
            setPublishOption({ ...publishOption, limitTime: value })
          }}
        />
        <span style={{ marginLeft: '12px' }}>分钟</span>
      </div>
      <div>
        <span className="bl"> 限时进入:</span>
        <TimePicker
          showNow={false}
          style={{ height: '2rem' }}
          format={'HH:mm'}
          onChange={(v, d) =>
            setPublishOption({
              ...publishOption,
              limitEnterTime: translateTimeToNumber(d)
            })
          }
        />
      </div>
      <div>
        <span className="bl"> 限时提交:</span>
        <TimePicker
          showNow={false}
          format={'HH:mm'}
          style={{ height: '2rem' }}
          onChange={(v, d) =>
            setPublishOption({
              ...publishOption,
              limitSubmitTime: translateTimeToNumber(d)
            })
          }
        />
      </div>
      <Collapse bordered={false}>
        <Panel header="高级设置" key="1">
          <div className="highset">
            <div>
              <span className="bl"> 及格分数:</span>
              <InputNumber
                size="small"
                min={1}
                style={{ height: '2rem' }}
                max={100}
                // defaultValue={60}
                onChange={(value) => {
                  setPublishOption({ ...publishOption, passScore: value })
                }}
              />
            </div>
            <div>
              <span className="bl"> 重做次数:</span>
              <InputNumber
                size="small"
                min={0}
                style={{ height: '2rem' }}
                max={10}
                // defaultValue={0}
                onChange={(value) => {
                  setPublishOption({ ...publishOption, remakeTime: value })
                }}
              />
            </div>
            <div>
              <span className="bl"> 填空题区分大小写:</span>
              <Switch
                onChange={(value) => {
                  setPublishOption({ ...publishOption, isDistinguishCase: value ? 1 : 0 })
                }}
              />
            </div>
            <div>
              <span className="bl"> 考完查看分数:</span>
              <Switch
                onChange={(value) => {
                  setPublishOption({ ...publishOption, isShowScore: value ? 1 : 0 })
                }}
              />
            </div>
            <div>
              <span className="bl"> 考完查看试卷:</span>
              <Switch
                onChange={(value) => {
                  setPublishOption({ ...publishOption, isAllowShowPaper: value ? 1 : 0 })
                }}
              />
            </div>
            <div>
              <span className="bl"> 是否取多次最高成绩:</span>
              <Switch
                onChange={(value) => {
                  setPublishOption({ ...publishOption, isGetHighScore: value ? 1 : 0 })
                }}
              />
            </div>
            <div>
              <span className="bl"> 考完查看排名:</span>
              <Switch
                onChange={(value) => {
                  setPublishOption({ ...publishOption, isShowRank: value ? 1 : 0 })
                }}
              />
            </div>
          </div>
        </Panel>
      </Collapse>
    </>
  )
}
