import { client } from '../server'
import OSS from 'lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-6.17.1.min'
import 'lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.4.min'

Object.defineProperty(window, 'OSS', {
  value: OSS
})

interface IUploadInfo {
  videoId: string // videoId，由服务端返回的音/视频ID
  endpoint: string // OSS对外服务的访问域名
  bucket: string // OSS存储空间
  object: string // OSS存储数据的基本单元
  file: File
}

class AliYunOSS {
  OSS: any
  timeout = 60000
  partSize = 1048576
  parallel = 5
  retryCount = 3
  retryDuration = 2
  region = 'cn-shanghai'
  userId = '1111'
  file = null
  authProgress = 0
  uploadDisabled = true
  resumeDisabled = true
  pauseDisabled = true
  uploader = null
  statusText = ''

  constructor(oss: any) {
    this.OSS = oss
    // this.createUpLoader()
  }

  createUpLoader() {
    const AliYunUpload = this.OSS
    console.log(AliYunUpload, this.OSS, 'OSS')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    const uploader = new AliYunUpload.Vod({
      timeout: this.timeout,
      partSize: Math.round(this.partSize),
      parallel: this.parallel,
      retryCount: this.retryCount,
      retryDuration: this.retryDuration,
      region: 'cn-beijing',
      userId: this.userId,

      // 添加文件成功
      addFileSuccess: function (uploadInfo: IUploadInfo) {
        _this.uploadDisabled = false
        _this.resumeDisabled = false
        _this.statusText = '添加文件成功, 等待上传...'
        console.log('addFileSuccess: ' + uploadInfo.file.name)
      },
      // 开始上传
      onUploadstarted: function (uploadInfo: IUploadInfo) {
        // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
        // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
        // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
        // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
        // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
        // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
        if (!uploadInfo.videoId) {
          const createUrl =
            'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
          client.get({ url: createUrl }).then(({ data }: { data: any }) => {
            const uploadAuth = data.UploadAuth
            const uploadAddress = data.UploadAddress
            const videoId = data.VideoId
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
          })
          _this.statusText = '文件开始上传...'

          console.log(
            'onUploadStarted:' +
              uploadInfo.file.name +
              ', endpoint:' +
              uploadInfo.endpoint +
              ', bucket:' +
              uploadInfo.bucket +
              ', object:' +
              uploadInfo.object
          )
        } else {
          // 如果videoId有值，根据videoId刷新上传凭证
          // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
          const refreshUrl =
            'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' +
            uploadInfo.videoId
          client.get({ url: refreshUrl }).then(({ data }) => {
            const uploadAuth = data.UploadAuth
            const uploadAddress = data.UploadAddress
            const videoId = data.VideoId
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
          })
        }
      },

      // 文件上传成功
      onUploadSucceed: function (uploadInfo: IUploadInfo) {
        console.log(
          'onUploadSucceed: ' +
            uploadInfo.file.name +
            ', endpoint:' +
            uploadInfo.endpoint +
            ', bucket:' +
            uploadInfo.bucket +
            ', object:' +
            uploadInfo.object
        )
        _this.statusText = '文件上传成功!'
      },
      // 文件上传失败
      onUploadFailed: function (uploadInfo: IUploadInfo, code: number, message: string) {
        console.log('onUploadFailed: file:' + uploadInfo.file.name + ',code:' + code + ', message:' + message)
        _this.statusText = '文件上传失败!'
      },

      // 取消文件上传
      onUploadCanceled: function (uploadInfo: IUploadInfo, code: number, message: string) {
        console.log('Canceled file: ' + uploadInfo.file.name + ', code: ' + code + ', message:' + message)
        _this.statusText = '文件已暂停上传'
      },

      // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
      onUploadProgress: function (uploadInfo: IUploadInfo, totalSize: number, progress: number) {
        console.log(
          'onUploadProgress:file:' +
            uploadInfo.file.name +
            ', fileSize:' +
            totalSize +
            ', percent:' +
            Math.ceil(progress * 100) +
            '%'
        )
        _this.authProgress = Math.ceil(progress * 100)
        _this.statusText = '文件上传中...'
      },

      // 上传凭证超时
      onUploadTokenExpired: function (uploadInfo: IUploadInfo) {
        // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
        // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
        // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
        const refreshUrl =
          'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' +
          uploadInfo.videoId
        client.get({ url: refreshUrl }).then(({ data }) => {
          const uploadAuth = data.UploadAuth
          uploader.resumeUploadWithAuth(uploadAuth)
          console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
        })
        _this.statusText = '文件超时...'
      },

      // 全部文件上传结束
      onUploadEnd: function (uploadInfo: IUploadInfo) {
        console.log('onUploadEnd: uploaded all the files')
        _this.statusText = '文件上传完毕'
      }
    })
    return uploader
  }
}

export default AliYunOSS
