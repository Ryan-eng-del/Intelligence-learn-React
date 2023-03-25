import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, message, Modal, Popconfirm, Row, Switch, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ClassDefaultPic from 'assets/img/class.jpg'
import { EmptyPage } from 'pages/EmptyPages/EmptyPage'
import { PrimaryButton } from 'publicComponents/Button/index'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import { ClassCard } from 'publicComponents/TeachRotePage'
import React, { useReducer, useState } from 'react'
import { useCreateClass, useDeleteCourse, useEditCourse, useShowCreateClass, useSendPicture } from 'server/fetchCourse'
import { CourseList } from 'server/fetchCourse/types'
import { baseURL } from 'server/request/config'
import { initialState, TeachRoutePageReducer } from './config/reducer'
import { beforeUpload, getBase64 } from './config/util'
import { TeachPageWrapper, UploadImageWrapper } from './TeachPageStyle'

export const TeachPage: React.FC = () => {
  const { TextArea } = Input
  const [state, dispatch] = useReducer(TeachRoutePageReducer, initialState)
  const { uploadLoading, modalVisible, imgUrl, className, EditVisible, EditingCourse, courseDescribe } = state

  const [courseCover, setCourseCover] = useState<string>('');
  const [file, setFile] = useState<UploadFile | null>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');


  const { data, isLoading } = useShowCreateClass()

  const { mutateAsync: DeleteCourse } = useDeleteCourse()
  const { mutateAsync: EditCourse } = useEditCourse()
  const { mutateAsync: sendPicture } = useSendPicture()

  const { mutateAsync: createClass } = useCreateClass({
    course_name: className,
    course_describe: courseDescribe,
    course_cover:courseCover
  })


  const showModal = () => {
    dispatch({ type: 'setClassName', payload: '' })
    dispatch({ type: 'setCourseDescribe', payload: '' })
    dispatch({ type: 'setModalVisible', payload: true })
  }

  const handleOk = async () => {
    dispatch({ type: 'setModalVisible', payload: false })

    createClass()
    // const formData = new FormData()
    // console.log('file', file);

    // formData.append('avatar', file)
    // try {
    //   await sendPicture(formData).then((data: string) => {
    //     createClass(data)
    //   })

    // } catch (e) {
    // } finally {
    dispatch({ type: 'setClassName', payload: '' })
    dispatch({ type: 'setClassTeacher', payload: '' })
    dispatch({ type: 'setImgUrl', payload: '' })
    // }
  }
  // const handleCancel = () => dispatch({ type: 'setModalVisible', payload: false })

  // 打开编辑
  const handleEdit = (item: CourseList) => {
    dispatch({ type: 'setEditCourse', payload: item })
    dispatch({ type: 'setClassName', payload: item.courseName })
    dispatch({ type: 'setEditVisible', payload: true })
    dispatch({ type: 'setCourseDescribe', payload: item.courseDescribe })
  }
  // 删除
  const handleDelete = async () => {
    await DeleteCourse(EditingCourse.courseId)
    dispatch({ type: 'delClasList', payload: EditingCourse.courseId })
    dispatch({ type: 'setEditVisible', payload: false })
  }
  // 确认编辑
  const confirmEdit = async () => {

    // const formData = new FormData()
    // formData.append('avatar', file)

    // await sendPicture(courseCover).then((data: string) => {
    EditCourse({
      courseId: EditingCourse.courseId,
      courseName: className,
      courseCover: courseCover,
      courseDescribe: courseDescribe
    })
    // }
    // )


    dispatch({ type: 'setEditVisible', payload: false })
    // 页面更新
    dispatch({ type: 'setClasList', payload: EditingCourse })
  }
  //////////////////////////////////////////////////////////////////////////////////

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });



  const handleCancel = () => {
    setPreviewOpen(false);
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };


  const handleChange = (e: any) => {
    console.log(e);
    setFile(e.file.originFileObj);

    if (e.file.status == 'done') {
      setCourseCover(e.file.response.data)
    }
    if (e.file.status == ' removed') {
      setFile(null)
    }
  }

  const handleRemove = (e: any) => {
    setFile(null)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <TeachPageWrapper>
        <>
          {/* /////////////////////////////////////////////////////////////////*/}
          {/* 新建课程弹出窗 */}
          <Modal
            title="新建课程"
            open={modalVisible}
            onOk={handleOk}
            onCancel={
              () => {
                setCourseCover('')
                setFile(null)
                dispatch({ type: 'setModalVisible', payload: false })
              }
            }
            okText="确认"
            cancelText="取消"
          >
            <label className="classname-label" htmlFor="classname">
              请输入课程名称
            </label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
            <div className="classname-label">请上传课程图片</div>
            <UploadImageWrapper>
              <img src={ClassDefaultPic} alt="默认课程图片" />

              <Upload
                action={`${baseURL}/resources/upload-avatar`}
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                name='avatar'
                method='post'
              >
                {file != null ? null : uploadButton}
              </Upload>

              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </UploadImageWrapper>
            <div className="classname-label">公开此课程</div>
            <Switch></Switch>
            <TextArea
              rows={4}
              value={courseDescribe}
              placeholder={'请输入课程描述'}
              onChange={(e) => {
                dispatch({ type: 'setCourseDescribe', payload: e.target.value })
              }}
            />
          </Modal>


          {/* /////////////////////////////////////////////////////////////////*/}

          {/* 编辑课程弹出窗 */}
          <Modal
            title="管理课程"
            open={EditVisible}
            onOk={confirmEdit}
            onCancel={() => {
              dispatch({ type: 'setEditVisible', payload: false })
              setCourseCover('')
              setFile(null)
            }}
            okText="确认"
            cancelText="取消"
          >
            <label className="classname-label" htmlFor="classname">
              更改课程名称
            </label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
            <div className="classname-label">更新课程封面</div>
            <UploadImageWrapper>
              <img src={ClassDefaultPic} alt="默认课程图片" />
              <Upload
                action={`${baseURL}/resources/upload-avatar`}
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                name='avatar'
                method='post'
              >
                {file != null ? null : uploadButton}
              </Upload>
            </UploadImageWrapper>
            <div className="classname-label">公开此课程</div>
            <Switch></Switch>
            <div className="classname-label">修改课程描述</div>
            <TextArea
              rows={4}
              value={courseDescribe}
              onChange={(e) => {
                dispatch({ type: 'setCourseDescribe', payload: e.target.value })
              }}
            />
            <div className="classname-label">其他选项</div>
            <Popconfirm onConfirm={handleDelete} title="你确定这样做吗，这将解散全部学生并删除里面的资源">
              <Button type="primary" danger>
                删除课程
              </Button>
            </Popconfirm>
          </Modal>
        </>

        {/* /////////////////////////////////////////////////////////////////*/}

        <GlobalHeader
          title="我教的课"
          tool={<PrimaryButton title="新建课程" handleClick={showModal}></PrimaryButton>}
        ></GlobalHeader>
        {isLoading ? (
          <Skeletons size="middle" />
        ) : (
          <>
            <GlobalRightLayout className="globalLayout">
              {data?.length == 0 ? (
                <EmptyPage description="你没有教授任何课程，点击右上角创建课程" />
              ) : (
                Array.from({ length: (data?.length || 4 % 4) + 1 }).map((v, i) => (
                  <Row key={i} style={{ marginBottom: '30px' }}>
                    {data?.map(
                      (item, index) =>
                        index >= i * 4 &&
                        index < (i + 1) * 4 && (
                          <ClassCard
                            to="MyTeach"
                            classInfo={item}
                            key={item.courseId}
                            EditModal={() => handleEdit(item)}
                          />
                        )
                    )}
                  </Row>
                ))
              )}
            </GlobalRightLayout>
          </>
        )}
      </TeachPageWrapper>
    </>
  )
}

export default TeachPage
