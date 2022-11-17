import React, { useState } from "react";
import { ClassManaStudentType } from './config/type'
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDeleteStudent, useShowStudent } from "server/fetchClass";
import { BaseLoading } from "baseUI/BaseLoding/BaseLoading";
import { remove } from "lodash";
import { FontSizeOutlined } from "@ant-design/icons";





export const ClassManaStudentList: React.FC<{ class_id: string }> = (props) => {
  const { data: studentList, isLoading: useShowStudentIsLoading, isSuccess: useShowStudentIsSuccess } = useShowStudent(props.class_id)
  const { mutate: deleteStudent, isSuccess: deleteStudenetIsSuccess } = useDeleteStudent()

  const columns: ColumnsType<ClassManaStudentType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '课程名称',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: '加入时间',
      dataIndex: 'join_time',
      key: 'join_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Button type='primary' onClick={() => {
            const classId = props.class_id
            const userId = record.userId
            deleteStudent({ classId, userId })
          }}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      {
        useShowStudentIsLoading ?
          <BaseLoading />
          :
          <Table style={{ height: '500px',fontWeight:'bold'}} size="small" columns={columns} dataSource={studentList} rowKey={record => record.userId} />
      }
    </>
  )
}