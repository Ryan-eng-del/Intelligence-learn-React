import React, { useCallback, useState } from 'react'
import { useAddContentResource } from '../../server/fetchChapter'
import { message } from 'antd'
import { ICourseTimeReducerAction } from '../../reducer/ChaperStudyTree/type/type'
import { useCurrentClassInfo } from '../../context/ClassInfoContext'
import { RcFile } from 'antd/lib/upload'
import OSS from 'lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-6.17.1.min'
import AliYunOSS from 'util/AliYunOSS'
import { upload } from '@testing-library/user-event/dist/upload'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AliyunUplaod = require('util/aliyun')

interface IUploadClassTimeResource {
  dispatch: React.Dispatch<ICourseTimeReducerAction>
  fileList: any[]
}

Object.defineProperty(window, 'OSS', {
  value: OSS
})

export const useHandleUploadClassTimeResource = (props: IUploadClassTimeResource) => {
  const { dispatch } = props
  /*添加资源抽屉开启和关闭*/
  const { classInfo } = useCurrentClassInfo()
  const [openResourceDrawer, setOpenResourceDrawer] = useState(false)
  /*添加资源loading*/
  const [uploading, setUploading] = useState(false)

  /*关联知识点*/
  const [relatePoints, setRelatePoints] = useState([])
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  /*添加资源API*/
  const { mutateAsync: addContentResource } = useAddContentResource()

  const startUpload = () => {
    console.log('start')
  }

  const finishUpload = () => {
    console.log('start')
  }

  const errUpload = () => {
    console.log('start')
  }
  const uploader = new AliYunOSS(AliyunUplaod, setProgress, startUpload, finishUpload, setStatusText, errUpload)
    .uploader

  /* 处理上传 */
  const handleUpload = async () => {
    props.fileList.forEach((file) => {
      uploader.addFile(file)
    })
    uploader.startUpload()

    // dispatch({ type: 'setModalState', open: true })
    // setOpenResourceDrawer(false)

    try {
      // const resourceData = await addContentResource({
      //   file: formData,
      //   relatedPoints: relatePoints,
      //   CourseId: classInfo.courseId
      // })
      //
      //
      const resourceData = null
      console.log(resourceData, 'resourceData')
      // const resourceData = undefined
      resourceData &&
        dispatch({
          type: 'setFileList',
          fileObj: <T>(pre: T[]) => {
            if (pre) pre = pre.concat(resourceData)
            return pre
          }
        })
    } catch (err) {
      message.warn('上传错误，请检查网络')
    } finally {
      setUploading(false)
    }
  }

  /*选择树来触发*/
  const handleRelateCheck = useCallback((checkInfo: any) => {
    const { checked } = checkInfo
    setRelatePoints(checked)
  }, [])

  return {
    handleUpload,
    openResourceDrawer,
    uploading,
    relatePoints,
    setOpenResourceDrawer,
    handleRelateCheck,
    progress,
    statusText
  }
}
