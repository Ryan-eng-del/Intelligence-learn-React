import React, { useState } from 'react'
import { ModalContextWrapper } from './LearnPageStyle'
import { Input, Modal, Row } from 'antd'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/index'
import { PrimaryButton } from 'publicComponents/Button'
import Skeletons from '../../../../publicComponents/Skeleton/index'

type Class = { classId: string; courseName: string; courseCover: string; teacherName: string }
const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<Class | undefined>()

  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinInvitedCourse()

  const [modal2Visible, setModalVisible2] = useState(false)
  const [confirmLoading2, setComfirmLoading2] = useState(false)

  // 窗口一
  const [modalVisible, setModalVisible] = useState(false)

  const { mutateAsync, isLoading: wait } = useShowInvitedCourseInfo()

  const handleOk = async () => {
    const data = await mutateAsync(invitedcode)
    setNewCourse(data)
    setModalVisible2(true)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleOk2 = () => {
    setComfirmLoading2(true)
    console.log('2323', newCourse)
    newCourse ? joinClass(newCourse.classId) : console.log('没有查询到班级')
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
            <img src={newCourse?.courseCover || require('assets/img/class.jpg')} alt="课程图片" />
            <h1>{newCourse?.courseName}</h1>
            <h3>{newCourse?.courseName}</h3>
          </ModalContextWrapper>
        </Modal>
      </>
      <>
        <GlobalHeader
          title="我学的课"
          tool={<PrimaryButton title="加入课程" handleClick={() => setModalVisible(true)}></PrimaryButton>}
        ></GlobalHeader>
        <GlobalRightLayout>
          {isLoading ? (
            <Skeletons size="middle" />
          ) : (
            Array.from({ length: (data?.length || 4 % 4) + 1 }).map((v, i) => (
              <Row key={i} style={{ marginBottom: '30px' }}>
                {data?.map(
                  (item, index) =>
                    index >= i * 4 &&
                    index < (i + 1) * 4 && <ClassCard to="MyStudy" classInfo={item} key={item.courseId} />
                )}
              </Row>
            ))
          )}
        </GlobalRightLayout>
      </>
    </>
  )
}

export default LearnPage
