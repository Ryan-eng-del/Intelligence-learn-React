import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useDeleteStudent, useShowStudent } from 'server/fetchClass'
import { StudentList } from 'server/fetchClass/types'
import Skeletons from '../../../../publicComponents/Skeleton/index'

export const ClassManaStudentList: React.FC<{ class_id: string }> = (props) => {
  const { data: studentList, isLoading: useShowStudentIsLoading } = useShowStudent(props.class_id)
  const { mutate: deleteStudent } = useDeleteStudent()

  const columns: ColumnsType<StudentList> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '课程名称',
      dataIndex: 'class_name',
      key: 'class_name'
    },
    {
      title: '加入时间',
      dataIndex: 'join_time',
      key: 'join_time'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const classId = props.class_id
              const userId = record.userId
              deleteStudent({ classId, userId })
            }}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return useShowStudentIsLoading ? (
    <Skeletons size="middle" />
  ) : (
    <Table
      style={{ height: '500px', fontWeight: 'bold' }}
      size="small"
      columns={columns}
      dataSource={studentList}
      rowKey={(record) => record.userId}
    />
  )
}
