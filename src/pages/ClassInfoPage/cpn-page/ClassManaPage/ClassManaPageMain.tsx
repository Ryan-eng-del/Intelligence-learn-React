import React, { useState } from 'react'
import { Card, Col, Row, Button, Input, Modal, Space, message, Badge, Typography, Popconfirm } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout'
import { PrimaryButton } from 'publicComponents/Button'
import { ClassList } from 'server/fetchClass/types'
import { useCreateNewClass, useDeleteClass, useReName } from 'server/fetchClass'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { isTeachAuth } from '../../../../util/isAuthTeach'
import { ClassManaStudentList } from './ClassManaStudentList'
import Skeletons from 'publicComponents/Skeleton'

export const ClassManaMain: React.FC<{ classList: ClassList[]; isLoading: boolean }> = ({ classList, isLoading }) => {
  const [input, setInput] = useState('')
  const [vis, setVis] = useState(false)
  const [show, setShow] = useState<ClassList | null>()
  const [add, setadd] = useState(false)

  const { classInfo } = useCurrentClassInfo()
  const { mutate: Rename, isLoading: renameState } = useReName(classInfo.courseId)
  const { mutate: DeleteClass } = useDeleteClass(classInfo.courseId)
  const { mutate: Add } = useCreateNewClass(classInfo.courseId)
  //删除班级的函数
  const removeClassFun = (id: string) => {
    DeleteClass(id)
    setVis(false)
  }

  // 点击分享
  const share = (invitedcode: string) => {
    navigator.clipboard.writeText(invitedcode).then(
      () => message.success('邀请码已复制到剪切板'),
      () => message.error('复制失败，请检测浏览器版本或权限设置')
    )
  }
  // 添加班级
  const AddClass = () => {
    setadd(false), Add(input)
  }

  return (
    <>
      <>
        <Modal title="请输入班级名称" centered visible={add} onOk={AddClass} onCancel={() => setadd(false)}>
          <Input placeholder="班级名称" id="classname" value={input} onChange={(e) => setInput(e.target.value)} />
        </Modal>
        {/* 班级详情 */}
        {show && (
          <Modal
            title={
              renameState ? (
                <BaseLoading />
              ) : (
                <Typography.Title
                  editable={{
                    onChange: (value) => {
                      setInput(value)
                    },
                    onEnd() {
                      Rename({ classId: show.class_id, className: input }), setVis(false)
                    }
                  }}
                  level={4}
                  style={{ margin: 0 }}
                >
                  {' '}
                  {`${show.class_name}`}{' '}
                </Typography.Title>
              )
            }
            centered
            visible={vis}
            width="1000px"
            footer={
              <>
                <Popconfirm
                  placement="top"
                  title="你确定哟啊删除此班级吗？全部学生将被解散。你可以设置为结课状态保留这个班级，"
                  okText="删除并解散全部学生"
                  onConfirm={() => show && removeClassFun(show.class_id)}
                  cancelText="取消"
                >
                  <Button type="primary" danger>
                    删除这个班级
                  </Button>
                </Popconfirm>
                <Button
                  type="primary"
                  onClick={() => {
                    share(show.class_invitation_code)
                  }}
                >
                  复制邀请码
                </Button>
              </>
            }
            onCancel={() => setVis(false)}
          >
            {/* 等到接口上了之后再打开 */}
            <div style={{ padding: 0, margin: 0 }}>
             <ClassManaStudentList class_id={show.class_id} />
          </div>
          </Modal>
        )}
        {/* 主体内容 */}
        <GlobalHeader
          title="班级管理"
          tool={isTeachAuth() && <PrimaryButton handleClick={() => setadd(true)} title="新建班级" />}
        ></GlobalHeader>
        <GlobalRightLayout>
          {isLoading ? (
            <Skeletons size="middle" />
          ) : (
            <Row gutter={[16, 24]}>
              {classList &&
                classList!.map((i) => (
                  <Col span={8} key={i.class_id}>
                    <Card
                      title={
                        <Space style={{ fontSize: '24px' }}>
                          <Typography.Text style={{ width: '220px' }} ellipsis={true}>
                            {i.class_name}
                          </Typography.Text>
                          <ShareAltOutlined
                            style={{ position: 'absolute', right: '20px', top: '25px' }}
                            onClick={(e) => (share(i.class_invitation_code), e.stopPropagation())}
                          />
                        </Space>
                      }
                      style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                      onClick={() => (setShow(i), setVis(true))}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        共 {i.student_number} 位学生
                        <Badge status="success" text="开课中" style={{ color: '#999' }} />
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </GlobalRightLayout>
      </>
    </>
  )
}
