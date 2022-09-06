import React, { useState } from 'react'
import { ResourceHeaderWrapper, ResourceTitleWrapper} from './ResourcePageStyle'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { Modal, Button, Upload, message } from 'antd'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'

export const Header: React.FC<{
  reflush: ()=>void

}> = ({
  reflush
}) => {
  const [upLoadModalVisible, setUpLoadModalVisible] = useState(false);

  const showUpLoadModal = () => {
    setUpLoadModalVisible(true);
  };

  const UploadModalOK = () => {
    setUpLoadModalVisible(false);
    reflush();
  };

  const UploadModalCancel = () => {
    setUpLoadModalVisible(false);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: ' ',
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e:any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <>
      <Modal title="上传资源" visible={upLoadModalVisible} onOk={UploadModalOK} onCancel={UploadModalCancel}>
        {/* 上传文件部分 */}
        <Upload.Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽到此上传文件</p>
          <p className="ant-upload-hint">
            记得关联知识点
          </p>
        </Upload.Dragger>
        {/* 知识点选择部分 */}
        <KnowledgeSeletor></KnowledgeSeletor>
      </Modal>

      <ResourceHeaderWrapper>
        <ResourceTitleWrapper>
          <div className="Resource-page-title">课程资源</div>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={showUpLoadModal}
          >
            上传文件
          </Button>
        </ResourceTitleWrapper>
      </ResourceHeaderWrapper>
    </>
  )
}
