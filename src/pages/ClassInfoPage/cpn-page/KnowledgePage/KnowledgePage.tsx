import React from 'react'
import { KnowledgeTree } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/KnowledgeTree'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/index'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useKnowledgeUI } from 'hook/useKnowledge/useKnowledgeUI'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { isTeachAuth } from '../../../../util/isAuthTeach'

export const KnowledgePage: React.FC = () => {
  const editable = isTeachAuth()
  const { knowledgeControl, treeData } = useKnowledgeUI(editable)

  return (
    <KnowledgePageWrapper>
      <GlobalHeader
        title="课程知识点"
        tool={
          editable && (
            <>
              <a className={'add-knowledge'} onClick={knowledgeControl.addKnowledgePoint}>
                添加知识点
              </a>
              <Link to={'/k-graph'}>
                <span className={'k-graph'}>课程知识图谱</span>
              </Link>
              <Link to={'/mk-graph'}>
                <span className={'mk-graph'}>个人知识图谱</span>
              </Link>
            </>
          )
        }
      ></GlobalHeader>
      <GlobalRightLayout>
        <KnowledgeTree treeData={treeData} knowledgeControl={knowledgeControl} />
      </GlobalRightLayout>
    </KnowledgePageWrapper>
  )
}
const KnowledgePageWrapper = styled.div`
  a.add-knowledge {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);
    margin-right: 20px;

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }

  span.k-graph,
  span.mk-graph {
    display: inline-block;
    padding: 0 16px;
    width: 130px;
    height: 36px;
    line-height: 36px;
    border: solid #94c1ff 1px;
    font-size: 14px;
    color: #3a8bff;
    font-weight: 500;
    border-radius: 20px;
    text-align: center;
    transition: 0.5s background-color ease;

    &:hover {
      background: #eaf0ff;
    }
  }

  span.mk-graph {
    margin-left: 8px;
  }
`
