import React, { useState } from 'react';
import { ArrowRightOutlined, CloseOutlined  } from '@ant-design/icons'
import moment from 'moment';
import { Modal, Button, Form, Switch, DatePicker, TreeSelect, Space } from 'antd';

export const PublishPanel: React.FC<{
  visible: boolean,
  close: ()=>void,
}> = ({
  visible, close
}) => {
  const [isTiming,setIsTiming] = useState(false)
  const dateFormat = 'YYYY-MM-DD';
  const { SHOW_PARENT } = TreeSelect;

  const treeData = [
    {
      title: '一班',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: '一班同学1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: '二班',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: '二班同学1',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: '二班同学2',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: '二班同学3',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];
  const [value, setValue] = useState(['0-0-0']);

  const onChange = (newValue: string[]) => {
    console.log('onChange ', value);
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    }
  }

  return (
    <Modal
      title={`发布${"试卷"}`}
      visible={visible}
      footer={[
        <Button key="cancel" onClick={close} icon={<CloseOutlined/>}>取消</Button>,
        <Button key="publish" type="primary"  onClick={close} icon={<ArrowRightOutlined/>}>发布</Button>,
      ]}
    >
      <Form>
        <Form.Item label="发布时间">
          <Space>
            <Switch onChange={(checked: boolean)=>setIsTiming(checked)}/>
            <h2>{isTiming ? "定时发布" : "现在发布"}</h2>
          </Space>
          <DatePicker.RangePicker
            defaultValue={[moment('2019-09-03', dateFormat), moment('2019-11-22', dateFormat)]}
            disabled={[!isTiming, false]}
          />
        </Form.Item>
        <Form.Item label="发布对象">
          <TreeSelect {...tProps} />
        </Form.Item>
        <Form.Item label="高级选项">

        </Form.Item>
      </Form>
    </Modal>
  )
}
