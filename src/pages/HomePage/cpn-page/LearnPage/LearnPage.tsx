import React, { useState } from 'react'
import { ModalContextWrapper } from './LearnPageStyle'
import { Input, Modal, Row } from 'antd'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { CourseInfo } from 'server/fetchCourse/types'
import { GlobalHeader } from '../../../../publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'

export const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<CourseInfo>({} as CourseInfo)

  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinInvitedCourse(invitedcode, newCourse)

  const [modal2Visible, setModalVisible2] = useState(false)
  const [confirmLoading2, setComfirmLoading2] = useState(false)

  // 窗口一
  const [modalVisible, setModalVisible] = useState(false)

  const { mutate, isLoading: wait } = useShowInvitedCourseInfo(invitedcode, setNewCourse, setModalVisible2)

  const handleOk = async () => {
    mutate()
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleOk2 = () => {
    setComfirmLoading2(true)
    joinClass()

    setComfirmLoading2(false)
    setModalVisible2(false)
    setModalVisible(false)
    setInvitedCode('')
  }
  const handleCancel2 = () => {
    setModalVisible2(false)
  }

  return (
    <>
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
          <ModalContextWrapper>
            <img src={newCourse.course_cover || require('assets/img/class.jpg')} alt="课程图片" />
            <h1>{newCourse.course_name}</h1>
            <h3>{newCourse.teacher_name}</h3>
          </ModalContextWrapper>
        </Modal>
      </>
      <>
        <GlobalHeader title="我学的课"></GlobalHeader>
        <GlobalRightLayout>
          {isLoading ? (
            <BaseLoading />
          ) : (
            <Row>
              {Array.from({
                length: (data as CourseInfo[]).length / 4 + 1
              }).map((v, i) => {
                return (data as CourseInfo[]).map((item: CourseInfo, index: number) => {
                  return (
                    <ClassCard
                      key={index}
                      id={item.class_id}
                      cname={item.course_name}
                      tname={item.course_name}
                      iurl={item.course_cover || null}
                      optimistic={item.optimistic}
                      Permission={false}
                    ></ClassCard>
                  )
                })
              })}
            </Row>
          )}
        </GlobalRightLayout>
      </>
    </>
  )
}
