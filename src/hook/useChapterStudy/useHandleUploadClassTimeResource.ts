import React, { useCallback, useRef, useState } from 'react'
import { useAddContentResource } from '../../server/fetchChapter'
import { ICourseTimeReducerAction } from '../../reducer/ChaperStudyTree/type/type'
import OSS from 'lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-6.17.1.min'
import AliYunOSS from 'util/AliYunOSS'
import { GlobalMessage } from '../../publicComponents/GlobalMessage'
import { createVideoAndOtherArr } from './util'
import { useParams } from 'react-router-dom'
import { useUploadVideo } from '../../server/fetchResource'

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
  /* 添加资源抽屉开启和关闭 */
  const courseId: string = useParams().id!
  const [openResourceDrawer, setOpenResourceDrawer] = useState(false)

  /* 上传资源是否成功 */
  const videoComplete = useRef(false)
  const otherComplete = useRef(false)

  /* 是否全部成功 */
  const allOk = videoComplete.current && otherComplete.current

  /*关联知识点*/
  const [relatePoints, setRelatePoints] = useState([])

  /* 进度条 */
  const [progress, setProgress] = useState(0)

  /* 上传状态文字 */
  const [statusText, setStatusText] = useState('')
  const videoId = useRef('')
  /*添加资源API*/
  const { mutateAsync: addContentResource, isLoading, isSuccess } = useAddContentResource()

  const { mutateAsync: uploadVideo } = useUploadVideo()

  const finishUpload = async () => {
    const data = await uploadVideo({ videoId: videoId.current, courseId, relatePoints })
    dispatch({ type: 'pushId', id: data.resourceId })
    videoComplete.current = true
  }

  const errUpload = () => GlobalMessage('error', '视频文件上传错误')

  const uploader = new AliYunOSS(AliyunUplaod, setProgress, finishUpload, setStatusText, errUpload, videoId).uploader

  /* 处理文件上传 */
  const handleUpload = async () => {
    const { videoProject, otherProject } = createVideoAndOtherArr(props.fileList)

    /* 视频文件上传 */
    videoProject.forEach((file: File) => {
      uploader.addFile(file)
    })
    uploader.startUpload()

    /* 非视频文件上传 */
    otherProject.map((file: any) => {
      const formData = new FormData()
      formData.append('file', file)
      return addContentResource({ relatedPoints: relatePoints, courseId, file: formData }).then((data) => {
        dispatch({ type: 'pushId', id: data.resourceId })
      })
    })

    /* 并发上传 */
    await Promise.all(otherProject)
      .then(() => (otherComplete.current = true))
      .catch(() => {
        GlobalMessage('error', '上传非视频文件出现错误')
        otherComplete.current = false
      })

    dispatch({
      type: 'setFileList',
      fileObj: <T>(pre: T[]) => {
        pre = pre.concat(props.fileList)
        return pre
      }
    })
  }

  /* 选择树来触发 */
  const handleRelateCheck = useCallback((checkInfo: any) => {
    const { checked } = checkInfo
    setRelatePoints(checked)
  }, [])

  const handleRelatePoints = () => {
    if (relatePoints.length <= 0) GlobalMessage('info', '没有绑定知识点，点击 X 退出')
    else {
      console.log('绑定')
    }
  }

  return {
    handleUpload,
    openResourceDrawer,
    relatePoints,
    setOpenResourceDrawer,
    handleRelateCheck,
    progress,
    isLoading,
    statusText,
    handleRelatePoints,
    isSuccess,
    otherComplete
  }
}
