import React from 'react'
import { Content } from './Content'
import { Collapse } from 'antd'
export const Test = () => {
  const element = <h1 className='greeting'>Hello, world!</h1>

  const a = {
    code: 600,
    msg: '操作成功',
    data: [
      {
        chapterId: '1548199989203644418',
        name: '第一章',
        chapterOrder: 1,
        courseId: '1547211425930256386',
        // courTimes: [{ name: "第一章下的课时" }],
        childChapters: [
          {
            chapterId: '1548284204075167745',
            name: '第一章 第一节',
            chapterOrder: 1,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时1',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1548285141518888961',
            name: '第一章 第二节',
            chapterOrder: 2,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时2',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1548285070375104513',
            name: '第一章 第三节',
            chapterOrder: 3,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时3',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          }
        ]
      },
      {
        chapterId: '1548199989203644418',
        name: '第二章',
        chapterOrder: 1,
        courseId: '1547211425930256386',
        // courTimes: [{ name: "第一章下的课时" }],
        childChapters: [
          {
            chapterId: '1548284204075167745',
            name: '第一章 第一节',
            chapterOrder: 1,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时1',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1548285141518888961',
            name: '第一章 第二节',
            chapterOrder: 2,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时2',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1548285070375104513',
            name: '第一章 第三节',
            chapterOrder: 3,
            courseId: '1547211425930256386',
            courTimes: [
              {
                id: '1523930851090391042',
                name: '课时3',
                resource: [{ name: '视频' }, { name: '课件' }]
              }
            ],
            childChapters: []
          }
        ]
      }
    ]
  }
  let result = []
  let child = []
  function gen(d, result) {
    child = []
    d.forEach((data) => {
      if (data.childChapters.length > 0) {
        gen(data.childChapters, result)
      }
      if (data.courTimes) {
        child.push(
          <>
            <Collapse>
              <Collapse.Panel header={data.name}>
                {<Content dataContent={data.courTimes} />}
              </Collapse.Panel>
            </Collapse>
          </>
        )
      } else {
        result.push(
          <>
            <Collapse style={{ width: '980px', margin: '0 auto' }}>
              <Collapse.Panel header={data.name}>{child}</Collapse.Panel>
            </Collapse>
          </>
        )
      }
    })
  }
  gen(a.data, result)
  return (
    <>
      {element}
      {result}
    </>
  )
}
