import { Button, Input, message, Modal, Row } from 'antd'
import classPicUrl from 'assets/img/class.jpg'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import { ClassCard } from 'publicComponents/TeachRotePage'
import React, { useState } from 'react'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper, ModalContextWrapper } from './LearnPageStyle'

type Class = { classId: string; courseName: string; courseCover: string; teacherName: string }
const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<Class | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const { data: raw, isLoading } = useShowLearnClass()
  const { mutateAsync: joinClass } = useJoinInvitedCourse()
  const { mutateAsync, isLoading: wait } = useShowInvitedCourseInfo()

  const handleOk = async () => {
    if (invitedcode == '') message.error('请输入邀请码')
    const data = await mutateAsync(invitedcode)
    setNewCourse(data)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const join = async (classId: string) => {
    setModalVisible(false)
    await joinClass(classId)
  }

  return (
    <>
      <Modal
        maskTransitionName=""
        transitionName=""
        title="加入课程"
        width={400}
        bodyStyle={{ height: 380 }}
        visible={modalVisible}
        onCancel={handleCancel}
        confirmLoading={wait}
        footer={
          newCourse
            ? [
                <Button onClick={() => (setNewCourse(undefined), setInvitedCode(''))} danger key="2">
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
          <label className="classname-label">输入邀请码</label>
          <Input
            placeholder="课程邀请码"
            id="classname"
            value={invitedcode}
            onChange={(e) => {
              setInvitedCode(e.target.value)
            }}
          />
          {newCourse && (
            <CardWrapper>
              <CardHeadWrapper>
                <img src={newCourse.courseCover || classPicUrl} alt="课程图片" />
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
          )}
        </ModalContextWrapper>
      </Modal>
      <>
        <GlobalHeader
          title="我学的课"
          tool={<PrimaryButton title="加入课程" handleClick={() => setModalVisible(true)}></PrimaryButton>}
        ></GlobalHeader>
        {isLoading ? (
          <Skeletons size="middle"></Skeletons>
        ) : (
          <GlobalRightLayout>
            {Array.from({ length: (raw?.length || 4 % 4) + 1 }).map((v, i) => {
              return (
                <Row key={i} style={{ marginBottom: '30px' }}>
                  {raw?.map(
                    (item, index) =>
                      index >= i * 4 && index < (i + 1) * 4 && <ClassCard to="MyStudy" classInfo={item} key={index} />
                  )}
                </Row>
              )
            })}
          </GlobalRightLayout>
        )}
      </>
    </>
  )
}

export default LearnPage
