import { AreaChartOutlined, ArrowRightOutlined, DeliveredProcedureOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, DatePicker, Drawer, Modal, Radio, Space, Table, Tree } from 'antd'
import { message } from 'antd/es'
import type { ColumnsType } from 'antd/es/table'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import dayjs from 'dayjs'
import { PublishPanel } from 'publicComponents/ExamPage/PublishPanel/PublishPanel'
import { StatisticsPanel } from 'publicComponents/ExamPage/StatisticsPanel/StatisticsPanel'
import { ClassList, PublishHomeworkType } from 'publicComponents/ExamPage/types/index'
import Skeletons from 'publicComponents/Skeleton/index'
import React, { Key, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPaperTarget, useReleaseExam, useReleaseHomework, useShowExamList } from 'server/fetchExam'
import { ExamListItem } from 'server/fetchExam/types'
import styled from 'styled-components'
import { useImmer } from 'use-immer'
import { BaseSpin } from '../../../../../baseUI/BaseSpin/BaseSpin'

const { TreeNode } = Tree

const StudentListWrapper = styled.div`
  height: 427px;
`
const ExamListWrapper = styled.div``

export const ExamList: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { data, isLoading } = useShowExamList(courseId)

  const { data: publishTarget, mutateAsync: getPublishTarget } = useGetPaperTarget(courseId)

  const navigate = useNavigate()
  const [statistics, setStatistics] = useState(false)
  const initialGeneral = {
    paper_id: '',
    start_time: '',
    end_time: '',
    publishModalVisible: false,
    stuLen: 0,
    stuListModalVisible: false,
    distributeWay: 1,
    paperName: '',
    type: 0 // 通过type来区分发布试卷/作业的功能（0：试卷 /1：作业）
  }

  const initialExam: any = {
    paper_id: '',
    student_ids: [],
    limitTime: ''
  }

  const initialHomework: PublishHomeworkType = {
    paperId: '',
    studentIds: []
  }
  const initialStuTreeSelect = { expandKeys: [], checkedKeys: [] }

  const [limitTime, setLt] = useImmer('')
  const [examPublish, setExamPublish] = useImmer(initialExam)

  const [homeworkPublish, setHomeworkPublish] = useImmer(initialHomework)

  const [generalPublish, setGeneralPublish] = useImmer(initialGeneral)

  const [stuTreeSelect, setStuTreeSelect] = useImmer<{ expandKeys: string[]; checkedKeys: string[] }>(
    initialStuTreeSelect
  )
  console.log(publishTarget, 'target')
  const { mutate: releaseExam } = useReleaseExam()

  const { mutate: releaseHomework } = useReleaseHomework()

  const columns: ColumnsType<ExamListItem> = [
    {
      title: '试卷名字',
      dataIndex: 'paperName',
      key: 'paperName'
    },
    {
      title: '完成状态',
      dataIndex: 'isRelease',
      key: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button icon={<AreaChartOutlined />} onClick={() => setStatistics(true)}>
              统计
            </Button>
            <Button
              icon={<DeliveredProcedureOutlined />}
              onClick={() => {
                getPublishTarget(record.paperId)
                setGeneralPublish((draft) => {
                  draft.publishModalVisible = true
                  draft.paperName = record.paperName
                })
                setGeneralPublish((draft) => {
                  draft.paper_id = record.paperId
                })
              }}
            >
              发布
            </Button>
            <Button icon={<ArrowRightOutlined />} onClick={() => navigate(`/previewtestpaper/${record.paperId}`)}>
              打开
            </Button>
          </Space>
        </>
      )
    }
  ]

  const checkStudent = (e: any) => {
    setStuTreeSelect((draft) => {
      draft.checkedKeys = [...e.checked]
    })
  }

  const onClose = () => {
    setGeneralPublish((draft) => {
      draft.publishModalVisible = false
    })
  }

  const completeChooseStu = () => {
    setGeneralPublish((draft) => {
      draft.stuListModalVisible = false
      draft.stuLen = stuTreeSelect.checkedKeys.length
    })
  }

  const changeDistributeWay = (e: any) => {
    setGeneralPublish((draft) => {
      draft.distributeWay = e.target.value
    })
  }

  /*点击选择树进行展开和收缩*/
  const handleRelateExpand = (id: Key[], info: any) => {
    let key = info.node.key
    if (!info.node.expanded) {
      key = info.node.key
      setStuTreeSelect((draft) => {
        draft.expandKeys.push(key)
      })
    } else {
      key = info.node.key
      setStuTreeSelect((draft) => {
        draft.expandKeys = draft.expandKeys.filter((v) => v != key)
      })
    }
  }
  // 处理选择发布类型后的事件
  const handlePublishOption = (publishOption: any) => {
    console.log(publishOption, 'options')
    setLt(publishOption['limitTime'])
    setGeneralPublish({ ...generalPublish, type: publishOption.type })
    if (publishOption.type == 0) {
      setExamPublish({ ...examPublish, ...publishOption })
      // 让试卷获取paper_id
      setExamPublish((draft:any) => {
        draft.paper_id = generalPublish.paper_id
        draft.start_time = generalPublish.start_time
        draft.end_time = generalPublish.end_time
        // 让试卷获取student_ids
        draft.student_ids = stuTreeSelect.checkedKeys
      })
    } else {
      setHomeworkPublish({ ...homeworkPublish, ...publishOption })
      setHomeworkPublish((draft) => {
        // 让作业获取paperId
        draft.paperId = generalPublish.paper_id
        draft.start_time = generalPublish.start_time
        draft.end_time = generalPublish.end_time
        // 让作业获取studentIds
        draft.studentIds = stuTreeSelect.checkedKeys
      })
    }
  }

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const confirmPublish = () => {
    const isImmediate = generalPublish.distributeWay === 1

    const isPass = () => {
      console.log(stuTreeSelect.checkedKeys.length)
      console.log(generalPublish.end_time)
      console.log()
      return stuTreeSelect.checkedKeys.length > 0 && generalPublish.end_time && generalPublish.stuLen
    }
    try {
      if (isImmediate) {
        setExamPublish({ ...examPublish, start_time: dayjs(new Date()).format(dateFormat) })
        setHomeworkPublish({ ...homeworkPublish, start_time: dayjs(new Date()).format(dateFormat) })
      }
      if (isPass() && generalPublish.type == 0) {
        // examPublish.start_time = isImmediate ? dayjs(new Date()).format(dateFormat) : examPublish.start_time
        releaseExam({
          paperId: generalPublish.paper_id,
          studentIds: examPublish.student_ids,
          limitTime: limitTime,
          endTime: generalPublish.end_time,
          isAllShowPaper: 1,
          isShowScore: 1,
          startTime: dayjs(new Date()).subtract(1, 'day').format(dateFormat)
        })
      } else if (isPass() && generalPublish.type == 1) {
        releaseHomework(homeworkPublish)
      } else {
        message.info('请填写完所有必填的信息！')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setGeneralPublish(initialGeneral)
      setStuTreeSelect(initialStuTreeSelect)
    }
  }

  const getStudentListTreeData = () => {
    return publishTarget?.classList.map((classList: ClassList, index) => {
      let stuList
      if (classList.studentList && classList.studentList.length) {
        stuList = classList.studentList.map((stu) => {
          return <TreeNode checkable={!stu.isReleased} title={stu.studentName} key={stu.studentId}></TreeNode>
        })
      }
      return (
        <TreeNode title={classList.className} key={index} checkable={false}>
          {stuList}
        </TreeNode>
      )
    })
  }

  return isLoading ? (
    <Skeletons size="middle" />
  ) : (
    <ExamListWrapper>
      <Table columns={columns} dataSource={data!} rowKey="paperId" />
      <StatisticsPanel visible={statistics} close={() => setStatistics(false)} />

      <Drawer
        title={`${generalPublish.paperName}`}
        placement="right"
        onClose={onClose}
        open={generalPublish.publishModalVisible}
        mask={false}
        extra={
          <Button type="primary" onClick={confirmPublish}>
            点击发布
          </Button>
        }
      >
        <div>
          <Button
            icon={<UserAddOutlined />}
            onClick={() =>
              setGeneralPublish((draft) => {
                draft.stuListModalVisible = true
              })
            }
          >
            发放对象
          </Button>
          <span style={{ marginLeft: '12px ' }}>已经选择了 {generalPublish.stuLen} 位学生</span>
        </div>

        <div></div>
        <div style={{ margin: '12px 0' }}>
          <span>发放时间：</span>
          <Radio.Group onChange={changeDistributeWay} value={generalPublish.distributeWay}>
            <Radio value={1}>立即发放</Radio>
            <Radio value={2}>定时发放</Radio>
          </Radio.Group>

          <DatePicker
            format={dateFormat}
            onChange={(_, d) => {
              setGeneralPublish((draft) => {
                draft.start_time = d
              })
            }}
            showTime
            style={{ display: generalPublish.distributeWay === 1 ? 'none' : 'inline-block' }}
          />
        </div>

        <div style={{ margin: '12px 0' }}>
          <span>截至时间：</span>
          <DatePicker
            defaultValue={
              examPublish.end_time ? dayjs(examPublish.end_time) : dayjs('2023-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss')
            }
            format={dateFormat}
            onChange={(_, d) => {
              setGeneralPublish((draft) => {
                draft.end_time = d
              })
            }}
            showTime
          />
        </div>

        {/* 选择发布类型 */}
        <PublishPanel handlePublishOption={handlePublishOption} />
      </Drawer>

      <Modal
        open={generalPublish.stuListModalVisible}
        onCancel={() =>
          setGeneralPublish((draft) => {
            draft.stuListModalVisible = false
          })
        }
        title="学生列表"
        onOk={completeChooseStu}
      >
        <StudentListWrapper>
          {publishTarget ? (
            <TreeSelected
              checkTreeData={getStudentListTreeData()}
              relateKeys={stuTreeSelect.expandKeys}
              handleRelateCheck={checkStudent}
              handleRelateExpand={handleRelateExpand}
              curCheckId={stuTreeSelect.checkedKeys}
            />
          ) : (
            <BaseSpin size="large" />
          )}
        </StudentListWrapper>
      </Modal>
    </ExamListWrapper>
  )
}
