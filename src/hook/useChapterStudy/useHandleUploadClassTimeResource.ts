import React, { useCallback, useState } from 'react'
import { useAddContentResource } from '../../server/fetchChapter'
import { message } from 'antd'
import { ICourseTimeReducerAction } from '../../reducer/ChaperStudyTree/type/type'

interface IUploadClassTimeResource {
  dispatch: React.Dispatch<ICourseTimeReducerAction>
}
export const useHandleUploadClassTimeResource = (props: IUploadClassTimeResource) => {
  const { dispatch } = props
  /*添加资源抽屉开启和关闭*/
  const [openResourceDrawer, setOpenResourceDrawer] = useState(false)
  /*添加资源loading*/
  const [uploading, setUploading] = useState(false)
  /*关联知识点*/
  const [relatePoints, setRelatePoints] = useState([])
  /*添加资源API*/
  const { mutateAsync: addContentResource } = useAddContentResource()
  /* 处理上传 */
  const handleUpload = async () => {
    setOpenResourceDrawer(false)
    const formData = new FormData()
    setUploading(true)
    try {
      const resourceData = await addContentResource({
        file: formData,
        related_points: relatePoints,
        course_id: '1'
      })
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
  return { handleUpload, openResourceDrawer, uploading, relatePoints, setOpenResourceDrawer, handleRelateCheck }
}
