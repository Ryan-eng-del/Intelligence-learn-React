import React, { useState } from 'react'
import { Collapse, List } from 'antd'
export const Content = ({ dataContent }) => {
  return (
    <>
      {dataContent.map((item) => {
        return (
          <Collapse>
            <Collapse.Panel
              collapsible="header"
              header={item.name}
              key={item.id}
            >
              <List>
                {item.resource.map((item) => (
                  <div>{item.name}</div>
                ))}
              </List>
            </Collapse.Panel>
          </Collapse>
        )
      })}
    </>
  )
}
