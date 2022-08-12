import React, { useState } from 'react'
// import {  EditOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Collapse } from 'antd'
import { ChapterFolderType } from '../config/types'
import { ChapterTask } from '../ChapterTask/ChapterTask'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { ChapterFolderWrapper } from './ChapterFolderStyle'

export const ChapterFolder = (props: { data: ChapterFolderType[] }) => {
  const { data } = props
  const [hover, setHover] = useState(false)
  console.log("flod",data);

  return (
    <ChapterFolderWrapper>
      {/* <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}> */}
      <Collapse accordion>
        {data.map((item: ChapterFolderType) => (
          <Collapse.Panel
            collapsible="header"
            header={item.name}
            key={item.chapterId}
            extra={
              hover ? (
                <>
                  <Button type="primary" icon={<EditOutlined />}></Button>
                  &nbsp;&nbsp;
                  <Button
                    type="primary"
                    danger
                    icon={<CloseOutlined />}
                  ></Button>
                </>
              ) : (
                <></>
              )
            }
          >
            <ChapterFolder data={item.childChapters}></ChapterFolder>
            {item.courTimes ? (
              item.courTimes.map((i) => <ChapterTask key={i.taskId} item={i} />)
            ) : (
              <></>
            )}
          </Collapse.Panel>
        ))}
      </Collapse>
      {/* </div> */}
    </ChapterFolderWrapper>
  )
}
