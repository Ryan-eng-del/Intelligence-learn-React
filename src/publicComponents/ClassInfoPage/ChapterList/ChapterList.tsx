import React, { useState } from 'react'
import {
  Collapse,
  Button,
  List,
  Tag,
  Modal,
  Input,
  Dropdown,
  Menu,
  Upload,
  message,
  Popconfirm,
  Space
} from 'antd'
const { Panel } = Collapse
import { ChapterListType } from './config/types'
import { UploadOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import {
  ChapterListHeaderWrapper,
  ChapterListTitleWrapper,
  ModalContextWrapper
} from './ChapterListStyle'
import { RandomInt } from './config/util'
import { useNavigate } from 'react-router-dom'

export const ChapterList: React.FC = () => {
  const navigator = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false) // 添加List内容的Modal可见性
  const [uploadFrom, setUploadFrom] = useState({
    target: { title: '' },
    name: '',
    seletedType: '未选择'
  }) //新增Chapter的信息
  // const {
  //   data: chapterData,
  //   isLoading,
  //   isError
  // } = useShowCreateChatper({ course_id: 1 })
  const [renamingNode, setRenamingNode] = useState({ title: '', id: 0 }) // 重命名中的Collapse节点
  const data: ChapterListType = [
    {
      title: 'Chapter I',
      id: 1,
      sub: [
        { tag: '课件', id: 234, title: 'First KeJian Name' },
        { tag: 'Video', id: 233, title: 'First Video Name' }
      ]
    },
    {
      title: 'Chapter II',
      id: 2,
      sub: [{ tag: '课件', id: 434, title: 'Second Video Name' }]
    }
  ]
  const [Listdata, setListData] = useState(data) // Chapter List

  const UploadTypeList = [
    { label: '课件', key: '0' },
    { label: '视频', key: '1' },
    { label: '考核', key: '2' }
  ]

  // 折叠 Collapse
  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  // 添加章节
  const handleAddChapter = () => {
    const id = RandomInt()
    const node = { title: 'Chapter New', id: id, sub: [] }
    setRenamingNode(node) // 自动进入重命名
    setListData([...Listdata, node])
  }

  // 完成重命名
  const handleRename = (e: { target: { value: string } }) => {
    renamingNode.title = e.target.value
    // renamingNode 是 Listdata 的引用
    setListData(Listdata)
    setRenamingNode({ title: '', id: 0 })
  }

  // 点击添加内容
  const handleAddContent = (item: any) => {
    setUploadFrom({ ...uploadFrom, target: item })
    setIsModalVisible(true)
  }

  //确认添加内容
  const handleOK = () => {
    // 校验数据
    if (uploadFrom.name == '') {
      message.error('名字不能为空！')
      return
    }
    if (uploadFrom.seletedType == '未选择') {
      message.error('还没选择类型')
      return
    }
    // 更新数据
    console.log('添加Node')
    ;(uploadFrom.target as any).sub?.push({
      tag: uploadFrom.seletedType,
      id: RandomInt(),
      title: uploadFrom.name
    })
    setListData(Listdata)
    // 重置表单内容
    setUploadFrom({ target: { title: '' }, name: '', seletedType: '未选择' })
    setIsModalVisible(false)
  }

  // TODO: 检查上传文件的类型与所选的是否相符
  const beforeUpload = (file: any) => {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error(`${file.name} is not a png file`)
    }
    return isPNG || Upload.LIST_IGNORE
  }

  // 删除大项 item: 需要删除的大项
  const deleteChapter = (item: any) => () => {
    setListData(Listdata.filter((i) => i != item))
  }

  // 删除子项 item: 所在大项 sub: 需要删除的子项
  const deleteList = (item: any, sub: any) => () => {
    setListData(
      Listdata.map((i) => {
        if (i == item) {
          const newi = i
          newi.sub = newi.sub?.filter((s) => s != sub)
          return newi
        } else return i
      })
    )
  }

  return (
    <>
      {/* 页头 */}
      <ChapterListHeaderWrapper>
        <ChapterListTitleWrapper>
          <div className="ChapterList-page-title">章节</div>
          <Button
            type={'primary'}
            onClick={handleAddChapter}
            style={{ marginBottom: '24px' }}
          >
            添加章节
          </Button>
        </ChapterListTitleWrapper>
      </ChapterListHeaderWrapper>
      {/* 添加任务 */}
      <Modal
        visible={isModalVisible}
        onOk={handleOK}
        title={`添加学习内容到${uploadFrom.target?.title}中`}
        onCancel={() => setIsModalVisible(false)}
      >
        <ModalContextWrapper>
          <label className="classname-label">输入任务标题</label>
          <Input
            placeholder="内容标题"
            value={uploadFrom.name}
            size="large"
            style={{ margin: '3px 0 12px 0' }}
            onChange={(e) =>
              setUploadFrom({ ...uploadFrom, name: e.target.value })
            }
          />
        </ModalContextWrapper>
        <Space size="large">
          <div>选择任务类型：</div>
          <Dropdown
            overlay={
              <Menu
                selectable
                onSelect={(e) =>
                  setUploadFrom({
                    ...uploadFrom,
                    seletedType: (
                      UploadTypeList.find((i) => i.key == e.key) as any
                    ).label
                  })
                }
                items={UploadTypeList}
              />
            }
            trigger={['click']}
          >
            <a>{uploadFrom.seletedType}</a>
          </Dropdown>
          <Upload beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>
              请选择一个{uploadFrom.seletedType}文件
            </Button>
          </Upload>
        </Space>
      </Modal>
      {/* 主体内容 */}
      <Collapse onChange={onChange}>
        {Listdata.map((item) => (
          <Panel
            collapsible="header"
            header={
              item == renamingNode ? (
                <Input
                  defaultValue={renamingNode?.title}
                  autoFocus
                  onPressEnter={handleRename}
                  onBlur={handleRename}
                />
              ) : (
                item.title
              )
            }
            key={item.id}
            extra={
              <>
                <EditOutlined onClick={() => setRenamingNode(item)} />
                &nbsp;&nbsp;&nbsp;
                <Popconfirm
                  placement="left"
                  title={'确认删除吗?其全部内容都会被删除！'}
                  onConfirm={deleteChapter(item)}
                  okText="是"
                  cancelText="否"
                >
                  <CloseOutlined />
                </Popconfirm>
              </>
            }
          >
            <List
              dataSource={item.sub}
              renderItem={(sub) => (
                <div>
                  {/* ()=>navigator(`/study/${sub.id}`) and  map( tag -> studyPages ) */}
                  <List.Item
                    onClick={() => navigator(`/study`)}
                    style={{ display: 'inline-block' }}
                  >
                    <Tag color="blue">{sub.tag}</Tag>
                    {sub == renamingNode ? (
                      <Input
                        defaultValue={renamingNode?.title}
                        autoFocus
                        onPressEnter={handleRename}
                        onBlur={handleRename}
                      />
                    ) : (
                      sub.title
                    )}
                  </List.Item>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <EditOutlined onClick={() => setRenamingNode(sub)} />
                  &nbsp;&nbsp;&nbsp;
                  <Popconfirm
                    placement="left"
                    title={'确认删除吗?'}
                    onConfirm={deleteList(item, sub)}
                    okText="是"
                    cancelText="否"
                  >
                    <CloseOutlined />
                  </Popconfirm>
                </div>
              )}
            />
            <Button type="primary" onClick={() => handleAddContent(item)}>
              添加更多任务
            </Button>
          </Panel>
        ))}
      </Collapse>
    </>
  )
}

// TODO: 封一个EditableText
