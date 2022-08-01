import React from 'react'
import { KnowledgeListWrapper } from './KnowledgePageStyle'
import { KnowledgeTree } from 'publicComponents/ClassInfoPage'
export const KnowledgePage: React.FC = () => {
  return (
    <>
      <KnowledgeListWrapper>
        <KnowledgeTree />
      </KnowledgeListWrapper>
    </>
  )
}
