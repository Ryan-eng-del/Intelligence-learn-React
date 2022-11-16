import React, { useReducer, useState } from 'react'
import { ContentWrapper, HeaderWrapper, TitleWrapper } from 'publicComponents/PageStyle/PageHeaderWapper'
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
  Tooltip,
  Typography,
  Dropdown,
  Menu,
  Popconfirm
} from 'antd'
import { ClassManaPageReducer, initialState } from './config/reducer'
import { DownOutlined, HighlightOutlined, ShareAltOutlined } from '@ant-design/icons'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalRightLayout } from '../../../../publicComponents/GlobalLayout/index'

export const ClassManaPage: React.FC = () => {
  const [state, dispatch] = useReducer(ClassManaPageReducer, initialState)
  const [detailvisable, setDetailVisable] = useState(false)
  const [showing, setshowing] = useState<any>()
  const {
    modalVisible,
    classManaList,
    newClassName,
    inputClassName
    // searchKeyword
  } = state

  //重命名功能
  const renameFun = (curItem: any) => {
    dispatch({ type: 'rename', curItem })
  }

  //重命名确认的函数
  const renameFun_certain = (curItem: any) => {
    dispatch({ type: 'rename_certain', curItem }) //异步
  }

  //重命名取消的函数
  const renameFun_cancel = (curItem: any) => {
    dispatch({ type: 'rename_cancel', curItem })
    dispatch({ type: 'setNewClassName', payload: '' })
    console.log('取消')
  }

  //删除班级的函数
  const removeClassFun = (id: string) => {
    dispatch({ type: 'removeClass', id })
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
        id: '7',
        className: inputClassName,
        studentAmount: 0,
        renameState: false
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
  const share = (i: any, e?: any) => {
    e?.stopPropagation()
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.write(i.id as any).then(
        () => message.success('邀请码已复制到剪切板'),
        () => message.error('复制失败，请检测浏览器版本或权限设置')
      )
    }
  }

  return (
    <>
      {/* 新建班级的模态框 */}
      <Modal
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
        title={`管理 - ${showing?.className}`}
        centered
        visible={detailvisable}
        footer={
          <>
            <Popconfirm
              placement="top"
              title="你确定哟啊删除此班级吗？全部学生将被解散。你可以设置为结课状态保留这个班级，"
              okText="删除并解散全部学生"
              onConfirm={() => removeClassFun(showing)}
              cancelText="取消"
            >
              <Button type="primary" danger>
                删除这个班级
              </Button>
            </Popconfirm>
            <Button type="primary" onClick={() => share(showing.id)}>
              复制邀请码
            </Button>
          </>
        }
        onCancel={() => setDetailVisable(false)}
      >
        <Typography.Paragraph
          editable={{
            icon: <HighlightOutlined />,
            tooltip: '修改课程名字',
            onChange: renameFun_certain //不可用
          }}
        >
          班级名字
        </Typography.Paragraph>
        <Dropdown
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
        </Dropdown>
      </Modal>
      {/* 主体内容 */}
      <GlobalHeader
        title="班级管理"
        tool={<PrimaryButton title="添加章节" handleClick={addClass}></PrimaryButton>}
      ></GlobalHeader>

      <GlobalRightLayout>
        {' '}
        <ContentWrapper>
          <Row gutter={[16, 24]}>
            {classManaList.map((i) => (
              <Col span={8} key={i.id}>
                <Card
                  title={
                    <>
                      <Space style={{ fontSize: '24px' }}>
                        <Typography.Text style={{ width: '220px' }} ellipsis={true}>
                          {i.className}
                        </Typography.Text>
                        <ShareAltOutlined onClick={(e) => share(i, e)} />
                      </Space>
                    </>
                  }
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                  onClick={() => (setshowing(i), setDetailVisable(true))}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    共 {i.studentAmount} 位学生
                    <Badge status="success" text="开课中" style={{ color: '#999' }} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </ContentWrapper>
      </GlobalRightLayout>
    </>
  )
}
