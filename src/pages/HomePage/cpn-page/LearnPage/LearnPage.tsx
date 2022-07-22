//
//
//    此页面是未完成的页面，仅从我教的课复制用于占位
//
//
import React, { useReducer } from 'react'
import {
  LearnPageWrapper,
  LearnClassWrapper,
  LearnHeaderWrapper,
  LearnRoutePageWrapper,
  LearnTitleWrapper,
  ModalContextWrapper
} from './LearnPageStyle'
import { Col, Row } from 'antd'
import { Button, Modal, Input } from 'antd'
import { LearnRoutePageReducer, initialState } from './config/reducer'
import { ClassCard } from 'publicComponents/TeachRotePage'

export const LearnPage: React.FC = () => {
  const [state, dispatch] = useReducer(LearnRoutePageReducer, initialState)
  const { modalVisible, imgUrl, className, classLearner, classList } = state

  const showModal = () => {
    dispatch({ type: 'setModalVisible', payload: true })
  }

  const handleOk = () => {
    dispatch({
      type: 'setClasList',
      payload: {
        iurl: imgUrl,
        cname: className,
        tname: classLearner,
        id: classList.length + ''
      }
    })
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
    dispatch({ type: 'setClassLearner', payload: '' })
    dispatch({ type: 'setImgUrl', payload: '' })

    console.log(classList)
  }

  const handleCancel = () => {
    dispatch({ type: 'setModalVisible', payload: false })
  }

  return (
    <LearnRoutePageWrapper>
      <>
        <Modal
          title="加入课程"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <ModalContextWrapper>
            <label className="classname-label">输入邀请码</label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              style={{ margin: '3px 0 12px 0' }}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
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
            {classList
              .filter((i, index) => index !== 0)
              .map((item) => {
                return (
                  <Col span={6} key={item.id}>
                    <ClassCard
                      id={item.id}
                      cname={item.cname}
                      tname={item.tname}
                      iurl={item.iurl}
                    ></ClassCard>
                  </Col>
                )
              })}
          </Row>
        </LearnClassWrapper>
      </LearnPageWrapper>
    </LearnRoutePageWrapper>
  )
}
