import React from 'react'
import { Modal, Input } from 'antd'

export const AddTaskModal = (props: any) => {
  // const { isModalVisible, handleOK, setIsModalVisible, setUploadFrom } = props
  return (
    <></>
    // <Modal
    //     visible={isModalVisible}
    //     onOk={handleOK}
    //     title={`添加学习内容到${uploadFrom.target?.title}中`}
    //     onCancel={() => setIsModalVisible(false)}
    //   >
    //     <ModalContextWrapper>
    //       <label className="classname-label">输入任务标题</label>
    //       <Input
    //         placeholder="内容标题"
    //         value={uploadFrom.name}
    //         size="large"
    //         style={{ margin: '3px 0 12px 0' }}
    //         onChange={(e) =>
    //           setUploadFrom({ ...uploadFrom, name: e.target.value })
    //         }
    //       />
    //     </ModalContextWrapper>
    //     <Space size="large">
    //       <div>选择任务类型：</div>
    //       <Dropdown
    //         overlay={
    //           <Menu
    //             selectable
    //             onSelect={(e) =>
    //               setUploadFrom({
    //                 ...uploadFrom,
    //                 seletedType: (
    //                   UploadTypeList.find((i) => i.key == e.key) as any
    //                 ).label
    //               })
    //             }
    //             items={UploadTypeList}
    //           />
    //         }
    //         trigger={['click']}
    //       >
    //         <a>{uploadFrom.seletedType}</a>
    //       </Dropdown>
    //       <Upload beforeUpload={beforeUpload}>
    //         <Button icon={<UploadOutlined />}>
    //           请选择一个{uploadFrom.seletedType}文件
    //         </Button>
    //       </Upload>
    //     </Space>
    //   </Modal>
  )
}
