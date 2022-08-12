import React from 'react'
import { Collapse, List } from 'antd'
export const Content:React.FC<{dataContent:any[]}> = ({ dataContent }) => {
  return (
    <>
      {dataContent.map((item,i) => {
        return (
          <Collapse key={i}>
            <Collapse.Panel
              collapsible="header"
              header={item.name}
              key={item.id}
            >
              <List>
                {item.resource.map((item:any,index:number) => (
                  <div key={index}>{item.name}</div>
                ))}
              </List>
            </Collapse.Panel>
          </Collapse>
        )
      })}
    </>
  )
}
