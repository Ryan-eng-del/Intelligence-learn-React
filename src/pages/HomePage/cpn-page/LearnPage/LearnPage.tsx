import React, { useReducer, useState } from 'react'
import {
  LearnPageWrapper,
  LearnClassWrapper,
  LearnHeaderWrapper,
  LearnRoutePageWrapper,
  LearnTitleWrapper,
  ModalContextWrapper
} from './LearnPageStyle'
import { Button, Modal, Input, Col, Row } from 'antd'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useShowLearnClass, useJoinClass, useShowInvitedCourseInfo, useJoinInvitedCourse } from 'server/fetchClass'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { uniqueId } from 'lodash'
import { width } from 'dom7'
import { CourseInfo } from 'server/fetchClass/types'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'


export const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<CourseInfo>({} as CourseInfo)

  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinInvitedCourse(invitedcode, newCourse)

  const [modal2Visible, setModalVisible2] = useState(false);
  const [confirmLoading2, setComfirmLoading2] = useState(false)

  ////////////////////////////////////////////////////
  // 窗口一
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setComfirmLoading] = useState(false)

  const { mutate,isLoading:wait,isSuccess,} = useShowInvitedCourseInfo(invitedcode, setNewCourse,setModalVisible2)

  const showModal = () => {
    setModalVisible(true)
  }
  const handleOk = async() => {
    // setComfirmLoading(true)//展示loading
    mutate()
    //将设置的课程设置为状态方便加入
    setComfirmLoading(false)//关闭loading
    // setModalVisible2(true)//设置窗口2 展示
  }



  const handleCancel = () => {
    setModalVisible(false)
  }
  ////////////////////////////////////////////////////
  //窗口二


  const handleOk2 = () => {
    setComfirmLoading2(true)//打开loading
    joinClass()//使用mutate发送网络请求加入课程

    setComfirmLoading2(false)
    setModalVisible2(false)
    setModalVisible(false)
    setInvitedCode('')
  }
  const handleCancel2 = () => {
    setModalVisible2(false)

  }








  return (
    <LearnRoutePageWrapper>
      <>
        <Modal
          title="加入课程"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="查询"
          cancelText="取消"
          confirmLoading={wait}
        >
          <ModalContextWrapper>
            <label className="classname-label">输入邀请码</label>
            <Input
              placeholder="课程邀请码"
              id="classname"
              value={invitedcode}
              style={{ margin: '3px 0 12px 0' }}
              onChange={(e) => {
                // dispatch({ type: 'setInvitedCode', payload: e.target.value })
                setInvitedCode(e.target.value)
              }}
            />
          </ModalContextWrapper>
        </Modal>
      </>
      <>
        <Modal
          title="正在加入这门课"
          visible={modal2Visible}
          onOk={handleOk2}
          onCancel={handleCancel2}
          okText="确认"
          cancelText="取消"
          confirmLoading={confirmLoading2}
          width={300}
        >
          <ModalContextWrapper >
            <img src={newCourse.course_cover || require('assets/img/class.jpg')} alt="课程图片" />
            <h1>{newCourse.course_name}</h1>
            <h3>{newCourse.teacher_name}</h3>
          </ModalContextWrapper>

        </Modal>
      </>
      <LearnPageWrapper>
        <LearnHeaderWrapper>
          <LearnTitleWrapper>
            <div className="Learn-page-title">我学的课程</div>
            <Button type="primary" onClick={showModal}>
              加入课程
            </Button>
          </LearnTitleWrapper>
        </LearnHeaderWrapper>
        <LearnClassWrapper>
          <Row>
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
                {Array.from({ length: ((data as CourseInfo[]).length / 4) + 1 }).map((v, i) => {
                  return (
                    <Row key={uniqueId()} style={{ marginBottom: '30px', width: 1100 }}  >
                      {(data as CourseInfo[]).map((item: CourseInfo, index: number) => {
                        // if (item.optimistic == undefined) item.optimistic = true
                        if (index >= i * 4 &&
                          index < (i + 1) * 4)
                          return (
                            <Col span={6} key={item.class_id} >
                              <ClassCard
                                id={item.class_id}
                                cname={item.course_name}
                                tname={item.course_name}
                                iurl={item.course_cover || null}
                                optimistic={item.optimistic}
                              ></ClassCard>
                            </Col>
                          )
                      })}
                    </Row>
                  )
                })}
              </>
            )}
          </Row>
        </LearnClassWrapper>
      </LearnPageWrapper>
    </LearnRoutePageWrapper>
  )
}
