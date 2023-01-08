import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, InputNumber, Modal, Select, Space, Switch, TimePicker, TreeSelect } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { useReleaseExam, useReleaseHomework } from 'server/fetchExam'
import { Childen, paperTarget, PublishExamType, PublishHomeworkType, TreeData } from '../types'

const { RangePicker } = DatePicker
const { SHOW_PARENT } = TreeSelect
const { Option } = Select

export const PublishPanel: React.FC<{
  visible: boolean
  close: () => void
  studentTree: paperTarget
  paperId: string
}> = ({ visible, close, studentTree, paperId }) => {
  const [isTiming, setIsTiming] = useState(false)
  const [isExam, setIsExamType] = useState(false)
  const [isAllowRedo, setIsAllowRedo] = useState(false)
  const [value, setValue] = useState(['0-0'])

  const [publishPanelState, setpublishPanelState] = useState<PublishExamType | PublishHomeworkType>({
    paperId,
    studentIds: []
  }) //存取了所有发送网络请求需要的参数
  // 必须这个不然上面对象内的paperId 不更新
  useEffect(() => {
    setpublishPanelState({ ...publishPanelState, paperId })
  }, [paperId])

  // setpublishPanelState({...publishPanelState,paper_id:paperId})
  const { mutate: releaseExam } = useReleaseExam()
  const { mutate: releaseHomework } = useReleaseHomework()
  //一个用来发布试卷一个用来发布作业
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const treeData: TreeData[] = [] //用来放入学生选择树
  studentTree?.classList.map((i, index) => {
    const children: Childen[] = []
    i.studentList.map((i, index1) => {
      children.push({
        title: i.studentName,
        value: `${index}-${index1}`
      })
    })
    treeData.push({
      title: i.className,
      value: `${index}`,
      children: children
    })
  })

  const onChange = (newValue: string[]) => {
    setValue(newValue)
    const studentsTemp: string[] = []
    newValue.map((v) => {
      const temp = v.split('-')
      if (temp.length == 1) {
        //如果是包含的一整个班 既格式为('0')
        //遍历这个班的所有学生的id入数组
        studentTree.classList[parseInt(temp[0])].studentList.map((i) => {
          studentsTemp.push(i.studentId)
        })
      } else {
        //如果包含的是一个班中的几位同学 既格式为('0-1')
        studentsTemp.push(studentTree.classList[parseInt(temp[0])].studentList[parseInt(temp[1])].studentId)
      }
    })
    setpublishPanelState({ ...publishPanelState, studentIds: studentsTemp })
  } //学生选择树改变时触发

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%'
    }
  } //树的参数

  const translateTimeToNumber = (time: string) => {
    const timearr = time.split(':')
    return parseInt(timearr[0]) * 60 + parseInt(timearr[1])
  } //用来将时间转化为分钟

  return (
    <Modal
      title={`发布${isExam ? '考试' : '作业'} TODO：这里每个都选一遍才会有数据！！`}
      visible={visible}
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={close} icon={<CloseOutlined />}>
          取消
        </Button>,
        <Button
          key="publish"
          type="primary"
          onClick={() => {
            isExam ? releaseExam(publishPanelState) : releaseHomework(publishPanelState)
            close()
          }}
          icon={<ArrowRightOutlined />}
        >
          发布
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="开始时间-结束时间">
          <Space>
            <Switch onChange={(checked: boolean) => setIsTiming(checked)} />
            <h2>{isTiming ? '定时发布' : '现在发布'}</h2>
          </Space>
          <DatePicker.RangePicker
            showTime
            // moment(new Date()).format("YYYY-MM-DD HH:ss")
            defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
            format={dateFormat}
            disabled={[!isTiming, false]}
            onChange={(value, d) => {
              console.log(d)
              setpublishPanelState({ ...publishPanelState, startTime: d[0], endTime: d[1] })
            }}
          />
        </Form.Item>
        <Form.Item label="发布类型">
          <Space>
            <Switch onChange={(checked: boolean) => setIsExamType(checked)} />
            <h2>{isExam ? '试卷' : '作业'}</h2>
          </Space>
        </Form.Item>
        <Form.Item label="发布对象">
          <TreeSelect {...tProps} />
        </Form.Item>
        <Form.Item label="高级选项">
          {isExam ? (
            <>
              限制考试时间:
              <TimePicker
                showNow={false}
                format={'HH:mm'}
                onChange={(v, d) => {
                  setpublishPanelState({ ...publishPanelState, limitTime: translateTimeToNumber(d) })
                }}
              />
              开考几分钟后不允许进入:
              <TimePicker
                showNow={false}
                format={'HH:mm'}
                onChange={(v, d) =>
                  setpublishPanelState({
                    ...publishPanelState,
                    limitEnterTime: translateTimeToNumber(d)
                  })
                }
              />
              开考多久后可以提交
              <TimePicker
                showNow={false}
                format={'HH:mm'}
                onChange={(v, d) =>
                  setpublishPanelState({
                    ...publishPanelState,
                    limitSubmitTime: translateTimeToNumber(d)
                  })
                }
              />
              及格分数:
              <InputNumber
                size="small"
                min={1}
                max={100}
                defaultValue={60}
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, passScore: value })
                }}
              />
              是否区分大小写:
              <Switch
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isDistinguishCase: value ? 1 : 0 })
                }}
              />
              重做次数:
              <InputNumber
                size="small"
                min={0}
                max={10}
                defaultValue={0}
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, remakeTime: value })
                }}
              />
              是否可以查看分数:
              <Switch
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isShowScore: value ? 1 : 0 })
                }}
              />
              是否可以查看试卷:
              <Switch
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isAllowShowPaper: value ? 1 : 0 })
                }}
              />
              是否取多次最高成绩:
              <Switch
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isGetHighScore: value ? 1 : 0 })
                }}
              />
              是否可以查看排名:
              <Switch
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isShowRank: value ? 1 : 0 })
                }}
              />
            </>
          ) : (
            <>
              {/* <RangePicker showTime /> */}
              允许重做:
              <Switch
                onChange={(value) => {
                  setIsAllowRedo(value), setpublishPanelState({ ...publishPanelState, isAllowMakeUp: value ? 1 : 0 })
                }}
              />
              <br></br>
              取最高分:
              <Switch
                disabled={!isAllowRedo}
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isGetHighScore: value ? 1 : 0 })
                }}
              />
              <br></br>
              是否多选题未选全给一半分:
              <Switch
                disabled={!isAllowRedo}
                onChange={(value) => {
                  setpublishPanelState({ ...publishPanelState, isMultiHalfScore: value ? 1 : 0 })
                }}
              />
              <br></br>
              允许重做几次:
              <Select
                disabled={!isAllowRedo}
                style={{ width: '6em' }}
                onChange={(value: number) => {
                  setpublishPanelState({ ...publishPanelState, remakeTime: value })
                }}
              >
                <Option value={999}>不限制</Option>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
              </Select>
            </>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}
