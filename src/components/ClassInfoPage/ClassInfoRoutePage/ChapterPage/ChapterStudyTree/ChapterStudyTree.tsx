import React from 'react'
import { Tree } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ChapterTreeModal } from './cpn/ChapterTreeModal'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { useMount } from 'hook/useMount'
import { expandOnMount } from 'util/chapterStudyTree'
import styled from 'styled-components'

export const ChapterStudyTree = () => {
  /*UI驱动层*/
  const {
    treeData,
    isLoading,
    handleClickAddChapter,
    expandKeys,
    handleOnExpand,
    isModalVisible,
    setIsModalVisible,
    handleModalOk,
    resourceTitle,
    setResourceTitle,
    uploadType,
    setExpandKeys,
    data,
    setUploadType
  } = useChapterUI()

  // 每次挂载后全部展开
  useMount(() => {
    setExpandKeys(expandOnMount(data!))
  })
  return (
    <ChapterStudyTreeWrapper>
      <ChapterTreeModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOk={handleModalOk}
        resourceTitle={resourceTitle}
        setResourceTitle={setResourceTitle}
        uploadType={uploadType}
        setUploadType={setUploadType}
      />
      <a
        type={'primary'}
        className={'add-chapter'}
        onClick={handleClickAddChapter}
        style={{ marginBottom: '35px' }}
      >
        添加章节
      </a>
      {isLoading ? (
        <BaseLoading />
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
