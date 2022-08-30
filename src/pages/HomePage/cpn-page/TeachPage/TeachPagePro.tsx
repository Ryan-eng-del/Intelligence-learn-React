import React, { useReducer } from 'react'
import {
  TeachPageWrapper,
  TeachClassWrapper,
  TeachHeaderWrapper,
  TeachRoutePageWrapper,
  TeachTitleWrapper,
  ModalContextWrapper,
  UploadImageWrapper
} from './TeachPageStyle'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Row, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { Button, Modal, Input } from 'antd'
import { getBase64, beforeUpload } from './config/util'
import { TeachRoutePageReducer, initialState } from './config/reducer'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useCreateClass, useShowCreateClass } from 'server/fetchClass'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'

export const TeachPage = () => {
  const [state, dispatch] = useReducer(TeachRoutePageReducer, initialState)
  const { data, isLoading } = useShowCreateClass()
  const { uploadLoading, modalVisible, imgUrl, className } = state
  const { mutate: createClass } = useCreateClass({
    course_cover: imgUrl,
    course_name: className
  })
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      dispatch({ type: 'setUploadLoading', payload: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        dispatch({ type: 'setUploadLoading', payload: false })
        dispatch({ type: 'setImgUrl', payload: url })
      })
    }
  }

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const showModal = () => {
    dispatch({ type: 'setModalVisible', payload: true })
  }

  const handleOk = () => {
    createClass()
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
    dispatch({ type: 'setClassTeacher', payload: '' })
    dispatch({ type: 'setImgUrl', payload: '' })
  }

  const handleCancel = () => {
    dispatch({ type: 'setModalVisible', payload: false })
  }

  return (
    <TeachRoutePageWrapper>
      <>
        <Modal
          title="新建课程"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <ModalContextWrapper>
            <label className="classname-label" htmlFor="classname">
              请输入课程名称
            </label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
            <div className="classname-label">请上传课程图片</div>
            <UploadImageWrapper>
              <img src={require('assets/img/class.jpg')} alt="默认课程图片" />
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </UploadImageWrapper>
          </ModalContextWrapper>
        </Modal>
      </>
      <TeachPageWrapper>
        <TeachHeaderWrapper>
          <TeachTitleWrapper>
            <div className="teach-page-title">我教的课程</div>
            <Button type="primary" onClick={showModal}>
              新建课程
            </Button>
          </TeachTitleWrapper>
        </TeachHeaderWrapper>
        <TeachClassWrapper>
          {isLoading ? (
            <BaseLoading
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px'
              }}
            />
          ) : (
            <>
              {Array.from({ length: (data?.length % 4) + 1 }).map((v, i) => {
                return (
                  <Row key={i} style={{ marginBottom: '30px' }}>
                    {data?.map((item: any, index: any) => {
                      return (
                        index >= i * 4 &&
                        index < (i + 1) * 4 &&
                        (item.optimistic ? (
                          <Col span={6} key={item.course_id}>
                            <ClassCard
                              id={item.course_id}
                              cname={item.course_name}
                              tname={item.course_name}
                              iurl={item.courses_cover}
                              optimistic={item.optimistic}
                              user={'teacher'}
                            ></ClassCard>
                          </Col>
                        ) : (
                          <Col span={6} key={item.course_id}>
                            <ClassCard
                              id={item.course_id}
                              cname={item.course_name}
                              tname={item.course_name}
                              iurl={item.courses_cover}
                              user={'teacher'}
                            ></ClassCard>
                          </Col>
                        ))
                      )
                    })}
                  </Row>
                )
              })}
            </>
          )}
        </TeachClassWrapper>
      </TeachPageWrapper>
    </TeachRoutePageWrapper>
  )
}
