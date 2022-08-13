import React from 'react'
import { Modal, Input, Space, Dropdown, Menu, Upload, Button } from 'antd'
import { ChapterFolderType } from '../config/types'
import { ModalContextWrapper } from './AddTaskModalStyle'
import { UploadOutlined } from '@ant-design/icons'

export const AddTaskModal: React.FC<{
  display: boolean
  close: () => void
  loc?: ChapterFolderType //添加到的位置
}> = ({ display, close, loc }) => {
  return (
    <Modal
      visible={display}
      onOk={close}
      title={
        <span>
          添加学习内容到<b>{loc?.name}</b>中
        </span>
      }
      onCancel={close}
    >
      <ModalContextWrapper>
        <label className="classname-label">输入任务标题</label>
        <Input
          placeholder="内容标题"
          // value={uploadFrom.name}
          size="large"
          style={{ margin: '3px 0 12px 0' }}
          // onChange={(e) =>
          //   setUploadFrom({ ...uploadFrom, name: e.target.value })
          // }
        />
      </ModalContextWrapper>
      <Space size="large">
        <div>选择任务类型：</div>
        {/* <Dropdown
            overlay={
              <Menu
                selectable
                onSelect={(e) =>
                  setUploadFrom({
                    ...uploadFrom,
                    seletedType: (
                      UploadTypeList.find((i) => i.key == e.key) as any
                    ).label
                  })
                }
                items={UploadTypeList}
              />
            }
            trigger={['click']}
          >
            <a>{uploadFrom.seletedType}</a>
          </Dropdown> */}
        <Upload>
          <Button icon={<UploadOutlined />}>
            {/* 请选择一个{uploadFrom.seletedType}文件 */}
          </Button>
        </Upload>
      </Space>
    </Modal>
  )
}
