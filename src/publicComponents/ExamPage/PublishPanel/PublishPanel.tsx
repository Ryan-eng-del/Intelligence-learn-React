import React, { useState } from 'react'
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import moment from 'moment'
import {
  Modal,
  Button,
  Form,
  Switch,
  DatePicker,
  TreeSelect,
  Space,
  Select,
  InputNumber,
  TimePicker
} from 'antd'

const { RangePicker } = DatePicker;
const { SHOW_PARENT } = TreeSelect
const { Option } = Select;

export interface paperTarget {
  classList: {
    className: string,
    studentList: {
      studentId: string,
      studentName: string,
    }[]
  }[]
}

export interface TreeData {
  title: string,
  value: string,
  children: Childen[]
}

export interface Childen {
  title: string,
  value: string,
}

export const PublishPanel: React.FC<{
  visible: boolean
  close: () => void
  studentTree?: paperTarget
}> = ({ visible, close, studentTree }) => {
  const [isTiming, setIsTiming] = useState(false)
  const [isExam, setIsExamType] = useState(false)
  const [isAllowRedo, setIsAllowRedo] = useState(false)
  const [isAllowGetHighest, setIsAllowGetHighest] = useState(false)

  const dateFormat = 'YYYY-MM-DD'


  const treeData: TreeData[] = []
  studentTree?.classList.map((i, index) => {
    const children: Childen[] = []
    i.studentList.map((i, index1) => {
      children.push({
        title: i.studentName,
        value: `0-${index}-${index1}`,
      })
    })
    treeData.push({
      title: i.className,
      value: `0-${index}`,
      children: children
    })
  })


  const [value, setValue] = useState(['0-0-0'])

  const onChange = (newValue: string[]) => {
    setValue(newValue)
    console.log(value)
  }


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

  }


  return (
    <Modal
      title={`发布${'试卷'}`}
      visible={visible}
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={close} icon={<CloseOutlined />}>
          取消
        </Button>,
        <Button
          key="publish"
          type="primary"
          onClick={close}
          icon={<ArrowRightOutlined />}
        >
          发布
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="发布时间">
          <Space>
            <Switch onChange={(checked: boolean) => setIsTiming(checked)} />
            <h2>{isTiming ? '定时发布' : '现在发布'}</h2>
          </Space>
          <DatePicker.RangePicker
            defaultValue={[
              moment('2019-09-03', dateFormat),
              moment('2019-11-22', dateFormat)
            ]}
            disabled={[!isTiming, false]}
          />
        </Form.Item>
        <Form.Item label="发布类型">
          <Space>
            <Switch onChange={(checked: boolean) => setIsExamType(checked)} />
            <h2>{isExam ? "试卷" : "作业"}</h2>
          </Space>
        </Form.Item>
        <Form.Item label="发布对象">
          <TreeSelect {...tProps} />
        </Form.Item>
        <Form.Item label="高级选项">
          {
            isExam ? (<>
              限制考试时间:
              <RangePicker showTime />
              限制时间:
              <TimePicker format={ 'HH:mm'} />
              及格分数:
              <InputNumber size='small' min={1} max={100} defaultValue={60} onChange={(value) => { console.log(value); }} />
              限制提交时间:
              是否区分大小写:
              <Switch />
              重做次数:
              <InputNumber size='small' min={0} max={10} defaultValue={0} onChange={(value) => { console.log(value); }} />
              是否可以查看分数:
              <Switch />
              是否可以查看试卷:
              <Switch />
              是否取多次最高成绩:
              <Switch />
              是否可以查看排名:
              <Switch />
            </>)
              :
              (<>
                <RangePicker showTime />
                允许重做
                <Switch onChange={(checked: boolean) => setIsAllowRedo(checked)} />
                取最高分
                <Switch disabled={!isAllowRedo} onChange={(checked: boolean) => setIsAllowGetHighest(checked)} />
                允许重做几次
                <Select disabled={!isAllowRedo}>
                  <Option value={0}>
                    不限制
                  </Option>
                  <Option value={1}>
                    1
                  </Option>
                  <Option value={2}>
                    2
                  </Option>
                  <Option value={3}>
                    3
                  </Option>
                </Select>

              </>)
          }
        </Form.Item>
      </Form>
    </Modal>
  )
}
