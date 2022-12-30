import React, { useState } from 'react'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper, ModalContextWrapper } from './LearnPageStyle'
import { Button, Input, Modal, Row } from 'antd'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/index'
import { PrimaryButton } from 'publicComponents/Button'
import Skeletons from '../../../../publicComponents/Skeleton/index'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import styled from 'styled-components'

type Class = { classId: string; courseName: string; courseCover: string; teacherName: string }
const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<Class | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinInvitedCourse()
  const { mutateAsync, isLoading: wait } = useShowInvitedCourseInfo()

  const handleOk = async () => {
    const data = await mutateAsync(invitedcode)
    setNewCourse(data)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const join = (classId: string) => {
    debugger
    setModalVisible(false)
    setNewCourse(undefined)
    joinClass(classId)
  }

  return (
    <>
      <>
        <Modal
          maskTransitionName=""
          transitionName=""
          title="加入课程"
          width={250}
          visible={modalVisible}
          onCancel={handleCancel}
          confirmLoading={wait}
          footer={
            newCourse
              ? [
                  <Button onClick={() => setNewCourse(undefined)} danger key="2">
                    重新输入
                  </Button>
                ]
              : [
                  <Button onClick={handleOk} key="1">
                    查询
                  </Button>
                ]
          }
        >
          <ModalContextWrapper>
            {newCourse ? (
              <>
                <CardWrapper>
                  <CardHeadWrapper>
                    {/* <img src={require('assets/img/class.jpg')} alt="课程图片" /> */}
                  </CardHeadWrapper>
                  <CardBodyWrapper>
                    <div className="tname">{newCourse.courseName}</div>

                    <PrimaryButton
                      title="加入"
                      handleClick={() => join(newCourse.classId)}
                      style={{ width: '100px', marginTop: '12px' }}
                    />
                  </CardBodyWrapper>
                </CardWrapper>
              </>
            ) : (
              <>
                <label className="classname-label">输入邀请码</label>
                <Input
                  placeholder="课程邀请码"
                  id="classname"
                  value={invitedcode}
                  style={{ margin: '3px 0 12px 0' }}
                  onChange={(e) => {
                    setInvitedCode(e.target.value)
                  }}
                />
              </>
            )}
            {wait && <BaseLoading />}
          </ModalContextWrapper>
        </Modal>
      </>
      <>
        <GlobalHeader
          title="我学的课"
          tool={<PrimaryButton title="加入课程" handleClick={() => setModalVisible(true)}></PrimaryButton>}
        ></GlobalHeader>
        {isLoading ? (
          <Skeletons size="middle"></Skeletons>
        ) : (
          <GlobalRightLayout>
            {Array.from({ length: (data?.length || 4 % 4) + 1 }).map((v, i) => (
              <Row key={i} style={{ marginBottom: '30px' }}>
                {data?.map(
                  (item, index) =>
                    index >= i * 4 && index < (i + 1) * 4 && <ClassCard to="MyStudy" classInfo={item} key={index} />
                )}
              </Row>
            ))}
          </GlobalRightLayout>
        )}
      </>
    </>
  )
}

export default LearnPage
