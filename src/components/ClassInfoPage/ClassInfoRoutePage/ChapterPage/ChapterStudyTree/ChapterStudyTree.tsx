import React from 'react'
import { Tree } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ChapterTreeModal } from './cpn/ChapterTreeModal'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { useMount } from 'hook/useMount'
import { expandOnMount } from 'util/chapterStudyTree'
import styled from 'styled-components'
import { useChapterClient } from 'hook/useChapterStudy/useChapterStudyClient'
import { useKnowledgeClient } from '../../../../../hook/useKnowledge/useKnowledgeClient'
import { useKnowledgeControl } from '../../../../../hook/useKnowledge/useKnowledgeControl'
import { useKnowledgeServer } from '../../../../../hook/useKnowledge/useKnowledgeServer'
import { useKnowledgeUI } from '../../../../../hook/useKnowledge/useKnowledgeUI'
import { useCheckKnowledgeTreeUI } from '../../../../../hook/useKnowledge/useCheckKnowledgeTreeUI'

export const ChapterStudyTree = () => {
  /*UI驱动层*/
  const {
    treeData,
    isLoading,
    handleClickAddChapter,
    expandKeys,
    handleOnExpand,
    isModalVisible,
    resourceTitle,
    uploadType,
    data,
    resourceObj,
    setIsModalVisible,
    setResourceTitle,
    setExpandKeys,
    setUploadType,
    setResourceObj,
    setCurAddType
  } = useChapterUI()
  const {
    handleRelateCheck,
    handleRelateExpand,
    curCheckId,
    relateKeys,
    data: KnowledgeData
  } = useKnowledgeControl()
  const { checkTreeData } = useCheckKnowledgeTreeUI(KnowledgeData)
  // 每次挂载后全部展开
  useMount(() => {
    setExpandKeys(expandOnMount(data!))
  })

  return (
    <ChapterStudyTreeWrapper>
      <ChapterTreeModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        resourceTitle={resourceTitle}
        setResourceTitle={setResourceTitle}
        uploadType={uploadType}
        setUploadType={setUploadType}
        setResourceObj={setResourceObj}
        checkTreeData={checkTreeData}
        curCheckId={curCheckId}
        handleRelateCheck={handleRelateCheck}
        handleRelateExpand={handleRelateExpand}
        relateKeys={relateKeys}
      />
      <a
        type={'primary'}
        className={'add-chapter'}
        onClick={() => {
          handleClickAddChapter()
          setCurAddType('gen')
        }}
        style={{ marginBottom: '35px' }}
      >
        添加章节
      </a>
      {isLoading ? (
        <BaseLoading
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
          }}
        />
      ) : (
        <Tree
          expandedKeys={expandKeys}
          onExpand={handleOnExpand}
          onSelect={handleOnExpand}
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
