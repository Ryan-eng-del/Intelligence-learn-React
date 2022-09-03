import React, { useState } from 'react'
import {
  FileUnknownOutlined,
  FileImageOutlined,
  PlaySquareOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined
} from '@ant-design/icons'
import { last } from 'lodash'
import { Button, Space, Modal, Input, Popconfirm, message } from 'antd'

export const ResourceListItem: React.FC<{
  item: {
    id: string
    name: string
    time: string
  }
}> = ({item}) => {

  const [hover,setHover] = useState(false);

  const fileType = last(item.name.split('.'));
  const icon = fileType === undefined
  ? <FileUnknownOutlined />
  : ['png','jpg'].includes(fileType)
  ? <FileImageOutlined />
  : ['mp4'].includes(fileType)
  ? <PlaySquareOutlined />
  : ['xla','xlsx'].includes(fileType)
  ? <FileExcelOutlined />
  : ['ppt','pptx'].includes(fileType)
  ? <FilePptOutlined />
  : ['pdf'].includes(fileType)
  ? <FilePdfOutlined />
  : ['doc','docx'].includes(fileType)
  ? <FileWordOutlined />
  : <FileUnknownOutlined />

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <>
      <Modal title={`修改文件信息-${item.name}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <label>修改文件名</label>
        <Input defaultValue={item.name}>
        </Input>
        <Popconfirm
          title="Are you sure to delete this task?"
          // onConfirm={}={confirm}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type='primary' danger>删除这个文件</Button>
        </Popconfirm>
        <Button type='primary' >修改关联的知识点</Button>
      </Modal>
      <div
        className='flex'
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      >
        <Space style={{width:"20vw"}}>
          <div style={{fontSize:"30px"}}>
            {icon}
          </div>
          <div>{item.name}</div>
        </Space>
        <div>{item.time}</div>
        <Space size='middle' style={{visibility: hover ? "visible" : "hidden"}}>
          <Button type='primary' icon={<EyeOutlined />}>
            预览
          </Button>
          <Button type='primary' icon={<DownloadOutlined />}>
            下载
          </Button>
          <Button type='primary' icon={<EditOutlined />} onClick={showModal}>
            编辑
          </Button>
        </Space>
      </div>
    </>
  )
}
