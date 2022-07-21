import { AudioOutlined } from '@ant-design/icons';
import { Button, message, Upload, Input, Space, Divider, List } from 'antd';
import { DarkBackgroundColor } from 'publicComponents/PageStyle/Theme';
import React from 'react';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const data = [
  {
    icon: "图标 ",
    name: "文件名PNG",
    size: "17.0KB",
    time: "07-20 00:35",
  },
  {
    icon: "图标",
    name: "文件NP4",
    size: "--",
    time: "07-20 00:35"
  },
  {
    icon: "图标",
    name: "文件名ppt",
    size: "18.0MB",
    time: "07-20 00:35"
  }
]

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = (value: string) => console.log(value);
const { Search } = Input;

export const ResourcePage = () => {
  return (
    <div style={{
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex'
      }}>
        <Upload {...props} >
          <Button
            style={{
              marginLeft: 5,
              marginTop: 15,
              backgroundColor: '#64ffda',
              color: 'white',
              borderRadius: '75px'
            }}>
            上传文件
          </Button>
          <Button
            style={{
              marginLeft: 5,
              backgroundColor: 'white',
              color: '#64ffda',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '75px',
              borderColor: '#64ffda',
            }}>
            新建文件夹
          </Button>
        </Upload>
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={onSearch} style={{
            width: 200,
            marginTop: 20,
            marginLeft: 700,
          }} />
        </Space>
      </div>

      {/* 分割线 */}
      <div style={{
        height: '600px',
      }}>
        {/* 后面应该是动态的 */}
        <div style={{
          height: 570,
        }}>
          <div style={{
            display: 'flex',
            background: '#8a8b99',
            height: 50,
            alignContent: 'center'
          }}>
            <div style={{
              marginLeft:350,
              fontWeight:'bold',
              marginTop:10
            }}
            >
              文件名
            </div>
            <div style={{
              marginLeft:320,
              fontWeight:'bold',
              marginTop:10
            }}>
              大小
            </div>
            <div style={{
              marginLeft:320,
              fontWeight:'bold',
              marginTop:10
            }}>
              时间
            </div>
          </div>
          <List
            size="large"
            bordered
            dataSource={data}
            renderItem={item => <List.Item >
              <div >
                {item.icon}
              </div>
              <div >
                {item.name}
              </div><div>
                {item.size}
              </div>
              <div>
                {item.time}
              </div></List.Item>}
          />

        </div>
      </div>
    </div>
  )
};

export default ResourcePage;
