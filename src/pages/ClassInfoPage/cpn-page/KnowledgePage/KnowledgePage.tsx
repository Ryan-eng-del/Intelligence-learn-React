import React from 'react'
import { KnowledgeListWrapper } from './KnowledgePageStyle'
import { KnowledgeTree } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/KnowledgeTree'

export const KnowledgePage: React.FC = () => {
  return (
    <>
      <KnowledgeListWrapper>
        <KnowledgeTree />
      </KnowledgeListWrapper>
    </>
  )
}
