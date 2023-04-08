import { Badge, Modal, Tag } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import { Unaccomplished } from 'publicComponents/Unaccomplished'
import React from 'react'
import { useRecommendQuestion } from 'server/fetchExam'
import { QuestionType } from 'server/fetchExam/types'
import styled from 'styled-components'

export const PointRecommend: React.FC<{
  open: boolean
  close: () => void
}> = ({ open, close }) => {
  const { paperNameMap } = usePaperMap()

  const { classInfo } = useCurrentClassInfo()
  const { mutateAsync } = useRecommendQuestion(classInfo.courseId)
  const Date = [
    {
      title: '一加一等于几？',
      type: QuestionType.single,
      tag: [
        ['真命题', 0],
        ['其他', 1]
      ]
    },
    {
      title: '题目题目题目题目',
      type: QuestionType.multiple,
      tag: [
        ['真命题', 0],
        ['其他', 2]
      ]
    },
    {
      title: '题目三',
      type: QuestionType.judge,
      tag: [
        ['真命题', 1],
        ['其他', 1],
        ['数学', 2]
      ]
    }
  ]
  return (
    <Modal
      title="选择不熟练的知识点"
      open={open}
      width={800}
      onCancel={close}
      onOk={() => {
        close
      }}
    >
      <Unaccomplished>页面无接口</Unaccomplished>
      <KnowledgeSeletor
        once
        related={[]}
        callback={(e) => {
          console.log(e)
          mutateAsync(e[0]).then((data) => {
            console.log(data)
          })
        }}
      />
      <Flex>
        {Date.map((i) => (
          <Badge.Ribbon key={i.title} text={paperNameMap[i.type]}>
            <span className="card">
              <br />
              <div style={{ flexGrow: 1 }}>{i.title}</div>
              <br />
              <div>
                {i.tag.map((t, ix) => (
                  <Tag color={['green', 'yellow', 'red'][t[1] as any]} key={ix}>
                    {t[0]}
                  </Tag>
                ))}
              </div>
            </span>
          </Badge.Ribbon>
        ))}
      </Flex>
    </Modal>
  )
}

const Flex = styled.div`
  width: 98%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .card {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 200px;
    border: 1px solid #9090e4;
    /* margin: 10px; */
    border-radius: 20px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`
