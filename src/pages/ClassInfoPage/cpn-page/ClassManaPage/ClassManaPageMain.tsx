import React, { useReducer, useState } from 'react'

import {
  Card,
  Col,
  Row,
  Button,
  Input,
  Modal,
  Space,
  message,
  Badge,
  Typography,
  Popconfirm,
} from 'antd'
import { ClassManaPageReducer, initialState } from './config/reducer'
import {
  ShareAltOutlined
} from '@ant-design/icons'
import { useDeleteClass, /*, useReName */
useReName} from 'server/fetchClass'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ClassMana as classmana } from './config/type'
import { ClassManaStudentList } from './ClassManaStudentList'
export const ClassManaMain: React.FC<{ classList: classmana[] }> = (props) => {
  const [state, dispatch] = useReducer(ClassManaPageReducer, { ...initialState, classManaList: props.classList })
  const { mutate: deleteClassMutate } = useDeleteClass()
  const { mutate: renameMutate, isSuccess: renameMutateIsSuccess, isLoading: renameMutateIsLoading } = useReName()

  const [detailvisable, setDetailVisable] = useState(false)
  const [newName, setNewName] = useState('')
  const [renameState, setReNameState] = useState(false)
  const [showing, setshowing] = useState<classmana>({
    class_id: "",
    class_name: "",
    student_number: -1,
    class_invitation_code: "",
    renameState: false //重命名状态
  })

  const {
    modalVisible,
    classManaList,
    inputClassName
  } = state

  //删除班级的函数
  const removeClassFun = (id: string) => {
    dispatch({ type: 'removeClass', id })
    // 网络请求用来改服务端数据
    deleteClassMutate(id)
    setDetailVisable(false)
  }

  //打开模态框
  const addClass = () => {
    dispatch({ type: 'setModalVisible', payload: true })
  }

  //模态框的确认
  const setModalVisibleCertain = () => {
    dispatch({
      type: 'addClass',
      classManaItem: {
        class_id: '-1',
        class_name: inputClassName,
        student_number: 0,
        renameState: false,
        class_invitation_code: ""
      }
    })
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
    console.log(inputClassName)
  }

  //模态框的取消
  const setModalVisibleCancel = () => {
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
  }

  // 点击分享
  const share = (invitedcode: string) => {
    navigator.clipboard.writeText(invitedcode).then(
      () => message.success('邀请码已复制到剪切板'),
      () => message.error('复制失败，请检测浏览器版本或权限设置')
    )
  }

  const toUpdateClassName = (value: string) => {
    dispatch({ type: 'rename_certain', payload: { classId: showing.class_id, newClassName: value } })
    setshowing({ ...showing, class_name: value })
    setReNameState(false)
  }

  return (
    <>
      <>
        < Modal
          title="请输入班级名称"
          centered
          visible={modalVisible}
          onOk={setModalVisibleCertain}
          onCancel={setModalVisibleCancel}
        >
          <Input
            placeholder="班级名称"
            id="classname"
            value={inputClassName}
            onChange={(e) => {
              dispatch({ type: 'setClassName', payload: e.target.value })
            }}
          />
        </Modal>
        {/* 班级详情 */}
        <Modal
          // {`管理 - ${showing?.className}`}
          // title={(<p onClick={renameFun_certain}>{`${showing?.className}`}<EditOutlined /></p>)}
          title={
            renameState ? (
              <BaseLoading />
            ) :
              (
                <Typography.Title editable={{
                  onChange(value) {
                    // renames(value)
                    setNewName(value)
                    toUpdateClassName(value)
                  },
                  onEnd() {
                    // renames(value)
                    const class_id = showing.class_id
                    setReNameState(true)
                    renameMutate({ className: newName, classId: class_id }, {
                      onSuccess: () => {
                        toUpdateClassName(newName)
                      }
                    })
                  },
                }} level={4} style={{ margin: 0 }}>
                  {`${showing.class_name}`}
                </Typography.Title>
              )}
          centered
          visible={detailvisable}
          width='1000px'
          footer={
            <>
              <Popconfirm
                placement="top"
                title="你确定哟啊删除此班级吗？全部学生将被解散。你可以设置为结课状态保留这个班级，"
                okText="删除并解散全部学生"
                onConfirm={() => removeClassFun(showing.class_id)}
                cancelText="取消"
              >
                <Button type="primary" danger>
                  删除这个班级
                </Button>
              </Popconfirm>
              <Button type="primary" onClick={() => {
                share(showing.class_invitation_code)
              }}>
                复制邀请码
              </Button>
            </>
          }
          onCancel={() => setDetailVisable(false)}
        >
          {/* <Typography.Paragraph
              editable={{
                icon: <HighlightOutlined />,
                tooltip: '修改课程名字',
                onChange: renameFun_certain //不可用
              }}
            >
              班级名字
            </Typography.Paragraph> */}
          <div style={{ padding: 0, margin: 0 }}>

            {/* <Dropdown
              overlay={
                <Menu
                  selectable
                  defaultSelectedKeys={['1']}
                  items={[
                    {
                      key: '1',
                      label: <Badge status="success" text="开课中" />
                    },
                    {
                      key: '2',
                      label: <Badge status="default" text="已结束" />
                    }
                  ]}
                />
              }
            >
              <Typography.Link>
                <Space>
                  <Badge status="success" text="开课中" />
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown> */}
            <ClassManaStudentList class_id={showing.class_id} />
          </div>
        </Modal>
        {/* 主体内容 */}
              <div className="page-title">班级管理</div>
              <Button type="primary" onClick={addClass} className="add-button-X">
                新建班级
              </Button>
            <Row gutter={[16, 24]}>
              {classManaList!.map((i, index) => (

                <Col span={8} key={i.class_id}>
                  <Card
                    title={
                      <>
                        <Space style={{ fontSize: '24px' }}>
                          <Typography.Text
                            style={{ width: '220px' }}
                            ellipsis={true}
                          >
                            {i.class_name}
                          </Typography.Text>
                          <ShareAltOutlined style={{position: "absolute",right:"20px",top:"25px"}} onClick={(e) => (share(i.class_invitation_code), e.stopPropagation())} />
                        </Space>
                      </>
                    }
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                    onClick={() => (setshowing(i), setDetailVisable(true), console.log(showing))}
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      共 {i.student_number} 位学生
                      <Badge
                        status="success"
                        text="开课中"
                        style={{ color: '#999' }}
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

      </>
    </>
  )
}

