export {}
// 已弃用组件

// import React, { useReducer } from 'react'
// import {
//   TeachClassWrapper,
//   TeachRoutePageWrapper,
//   ModalContextWrapper,
//   UploadImageWrapper
// } from './TeachPageStyle'
// import {
//   PageWrapper,
//   HeaderWrapper,
//   TitleWrapper
// } from 'publicComponents/PageStyle/PageHeaderWapper'

// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// import { Col, Row, Upload } from 'antd'
// import type { UploadChangeParam } from 'antd/es/upload'
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
// import { Button, Modal, Input } from 'antd'
// import { getBase64, beforeUpload } from './config/util'
// import { TeachRoutePageReducer, initialState } from './config/reducer'
// import { ClassCard } from 'publicComponents/TeachRotePage'
// import { Link } from 'react-router-dom'

// export const TeachPage = () => {
//   const [state, dispatch] = useReducer(TeachRoutePageReducer, initialState)
//   const {
//     uploadLoading,
//     modalVisible,
//     imgUrl,
//     className,
//     classTeacher,
//     classList
//   } = state
//   const handleChange: UploadProps['onChange'] = (
//     info: UploadChangeParam<UploadFile>
//   ) => {
//     if (info.file.status === 'uploading') {
//       dispatch({ type: 'setUploadLoading', payload: true })
//       return
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj as RcFile, (url) => {
//         dispatch({ type: 'setUploadLoading', payload: false })
//         dispatch({ type: 'setImgUrl', payload: url })
//       })
//     }
//   }

//   const uploadButton = (
//     <div>
//       {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   )
//   const showModal = () => {
//     dispatch({ type: 'setModalVisible', payload: true })
//   }
//   const handleOk = () => {
//     dispatch({
//       type: 'setClasList',
//       payload: {
//         iurl: imgUrl,
//         cname: className,
//         tname: classTeacher,
//         id: classList.length + ''
//       }
//     })
//     dispatch({ type: 'setModalVisible', payload: false })
//     dispatch({ type: 'setClassName', payload: '' })
//     dispatch({ type: 'setClassTeacher', payload: '' })
//     dispatch({ type: 'setImgUrl', payload: '' })

//     console.log(classList)
//   }

//   const handleCancel = () => {
//     dispatch({ type: 'setModalVisible', payload: false })
//   }

//   return (
//     <TeachRoutePageWrapper>
//       <>
//         <Modal
//           title="新建课程"
//           visible={modalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           okText="确认"
//           cancelText="取消"
//         >
//           <ModalContextWrapper>
//             <label className="classname-label" htmlFor="classname">
//               请输入课程名称
//             </label>
//             <Input
//               placeholder="课程名称"
//               id="classname"
//               value={className}
//               onChange={(e) => {
//                 dispatch({ type: 'setClassName', payload: e.target.value })
//               }}
//             />
//             <div className="classname-label">请上传课程图片</div>
//             <UploadImageWrapper>
//               <img src={require('assets/img/class.jpg')} alt="默认课程图片" />
//               <Upload
//                 name="avatar"
//                 listType="picture-card"
//                 className="avatar-uploader"
//                 showUploadList={false}
//                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                 beforeUpload={beforeUpload}
//                 onChange={handleChange}
//               >
//                 {imgUrl ? (
//                   <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
//                 ) : (
//                   uploadButton
//                 )}
//               </Upload>
//             </UploadImageWrapper>
//           </ModalContextWrapper>
//         </Modal>
//       </>
//       <PageWrapper>
//         <HeaderWrapper>
//           <TitleWrapper>
//             <div className="page-title">我教的课程</div>
//             <Button type="primary" onClick={showModal}>
//               新建课程
//             </Button>
//           </TitleWrapper>
//         </HeaderWrapper>
//         <TeachClassWrapper>
//           <Row>
//             {classList
//               .filter((i, index) => index !== 0)
//               .map((item) => {
//                 return (
//                   <Col span={6} key={item.id}>
//                     <ClassCard
//                       id={item.id}
//                       cname={item.cname}
//                       tname={item.tname}
//                       iurl={item.iurl}
//                       Permission={true}
//                     ></ClassCard>
//                   </Col>
//                 )
//               })}
//           </Row>
//         </TeachClassWrapper>
//       </PageWrapper>
//     </TeachRoutePageWrapper>
//   )
// }
