import React from "react";
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDeleteStudent, useShowStudent } from "server/fetchClass";
import { BaseLoading } from "baseUI/BaseLoding/BaseLoading";
import { StudentList } from "server/fetchClass/types";





export const ClassManaStudentList: React.FC<{ class_id: string }> = (props) => {
  const { data: studentList, isLoading: useShowStudentIsLoading } = useShowStudent(props.class_id)
  const { mutate: deleteStudent } = useDeleteStudent()

  const columns: ColumnsType<StudentList> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '课程名称',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
      key: 'joinTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' danger onClick={() => {
            const classId = props.class_id
            const userId = record.userId
            deleteStudent({ classId, userId })
          }}>Delete</Button>
          <Button type='primary'>设为助教</Button>
        </Space>
      ),
    },
  ]

  return useShowStudentIsLoading
  ? <BaseLoading />
  : <Table
      style={{ height: '500px',fontWeight:'bold'}}
      size="small"
      columns={columns}
      dataSource={studentList}
      rowKey={record => record.userId}
      pagination={false}
    />

}