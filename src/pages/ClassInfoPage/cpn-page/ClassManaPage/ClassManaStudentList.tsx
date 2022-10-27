import React from "react";
import { ClassManaStudentType } from './config/type'
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useShowStudent } from "server/fetchClass";
import { BaseLoading } from "baseUI/BaseLoding/BaseLoading";


const columns: ColumnsType<ClassManaStudentType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'class_name',
    dataIndex: 'class_name',
    key: 'class_name',
  },
  {
    title: 'join_time',
    dataIndex: 'join_time',
    key: 'join_time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type='primary'>Delete</Button>
      </Space>
    ),
  },
]


export const ClassManaStudentList: React.FC<{ class_id: string }> = (props) => {
  const { data: studentList, isLoading: useShowStudentIsLoading } = useShowStudent(props.class_id)

  // const deleteStudent = (classId:string)=>{

  // }


  return (
    <>
      {
        useShowStudentIsLoading ?
          <BaseLoading />
         :
            <Table columns={columns} dataSource={studentList} />
      }
    </>
  )
}