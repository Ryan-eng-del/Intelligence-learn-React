import React from "react";
import {ClassManaStudentType} from './config/type'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';


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
        <a>Delete</a>
      </Space>
    ),
  },
]



export const ClassManaStudentList: React.FC<{studentlist:ClassManaStudentType[]}> = (props) => {
  return (
    <>
    <Table columns={columns} dataSource={props.studentlist} />;
    </>
  )
}