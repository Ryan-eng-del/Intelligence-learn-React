import React, { useEffect } from 'react'
import { Tree } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ChapterTreeModal } from './cpn/ChapterTreeModal'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { expandOnMount } from 'util/chapterStudyTree'
import styled from 'styled-components'
import { useKnowledgeControl } from '../../../../../hook/useKnowledge/useKnowledgeControl'
import { useCheckKnowledgeTreeUI } from '../../../../../hook/useKnowledge/useCheckKnowledgeTreeUI'

export const ChapterStudyTree = () => {
  /*UI驱动层*/
  const { treeData, chapterControl } = useChapterUI()
  const { knowledgeControl } = useKnowledgeControl()
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)
  // 每次挂载后全部展开
  useEffect(() => {
    chapterControl.dispatchChapter({
      type: 'setExpandKeys',
      expandKeys: () => expandOnMount(chapterControl.data || [])
    })
  }, [treeData])

  return (
    <ChapterStudyTreeWrapper>
      <ChapterTreeModal
        checkTreeData={checkTreeData}
        handleRelateCheck={knowledgeControl.handleRelateCheck}
        handleRelateExpand={knowledgeControl.handleRelateExpand}
        relateKeys={knowledgeControl.relateKeys}
        handleOk={chapterControl.handleOk}
      />
      <a
        type={'primary'}
        className={'add-chapter'}
        onClick={() => {
          chapterControl.handleClickAddChapter()
        }}
        style={{ marginBottom: '35px' }}
      >
        添加章节
      </a>
      {chapterControl.isLoading ? (
        <BaseLoading
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
          }}
        />
      ) : (
        <Tree
          expandedKeys={chapterControl.expandKeys}
          onExpand={chapterControl.handleOnExpand}
          onSelect={chapterControl.handleOnExpand}
        >
          {treeData && treeData}
        </Tree>
      )}
    </ChapterStudyTreeWrapper>
  )
}
const ChapterStudyTreeWrapper = styled.div`
  a.add-chapter {
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
    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }
`
