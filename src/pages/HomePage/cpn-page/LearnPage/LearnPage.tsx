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
import { useShowLearnClass, useJoinClass } from 'server/fetchClass'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { uniqueId } from 'lodash'
import { courseType } from './config/type/index'
import { width } from 'dom7'


export const LearnPage: React.FC = () => {
  const [state, dispatch] = useReducer(LearnRoutePageReducer, initialState)
  const { modalVisible, imgUrl, invitedcode, className, classLearner, classList } = state

  const showModal = () => {
    dispatch({ type: 'setModalVisible', payload: true })
  }
  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinClass(invitedcode)
  const handleOk = () => {
    joinClass()
    // dispatch({
    //   type: 'setClasList',
    //   payload: {
    //     iurl: imgUrl,
    //     cname: className,
    //     tname: classLearner,
    //     id: classList.length + ''
    //   }
    // })
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setInvitedCode', payload: '' })
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
              placeholder="课程邀请码"
              id="classname"
              value={invitedcode}
              style={{ margin: '3px 0 12px 0' }}
              onChange={(e) => {
                dispatch({ type: 'setInvitedCode', payload: e.target.value })
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
                {Array.from({ length: (data?.length / 4) + 1 }).map((v, i) => {
                  return (
                    <Row key={uniqueId()} style={{ marginBottom: '30px', width: 1100 }}  >
                      {data?.map((item: courseType, index: number) => {
                        // if (item.optimistic == undefined) item.optimistic = true
                        if (index >= i * 4 &&
                          index < (i + 1) * 4)
                          return (
                            <Col span={6} key={item.course_id} >
                              <ClassCard
                                id={item.course_id}
                                cname={item.course_name}
                                tname={item.course_name}
                                iurl={item.courses_cover}
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
