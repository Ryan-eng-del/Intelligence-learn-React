import React from 'react'
// import {  EditOutlined, CloseOutlined } from '@ant-design/icons'
import { Collapse} from 'antd'
import { ChapterFolderType } from './config/types'
import { ChapterTask } from './ChapterTask'

export const ChapterFolder = (props:{data:ChapterFolderType[]}) => {
  const { data } = props
  return (
    <>
      <Collapse>
        {
          data.map((item:ChapterFolderType) => (
            <Collapse.Panel
              collapsible="header"
              header={item.name}
              key={item.chapterId}
            >
              <ChapterFolder data={item.childChapters}></ChapterFolder>
              {
                item.courTimes ? item.courTimes.map((i)=>(<ChapterTask key={i.taskId} item={i} />)) : <></>
              }
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </>
  )
}
