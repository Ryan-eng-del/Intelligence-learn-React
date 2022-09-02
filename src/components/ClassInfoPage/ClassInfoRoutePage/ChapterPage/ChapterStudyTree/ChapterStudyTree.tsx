import React from 'react'
import { Button, Tree } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { ChapterTreeModal } from './cpn/ChapterTreeModal'
import { useChapterUI } from '../../../../../hook/useChapterStudy/useChapterUI'

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
    setUploadType
  } = useChapterUI()

  return (
    <div>
      <ChapterTreeModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOk={handleModalOk}
        resourceTitle={resourceTitle}
        setResourceTitle={setResourceTitle}
        uploadType={uploadType}
        setUploadType={setUploadType}
      />
      <Button
        type={'primary'}
        onClick={handleClickAddChapter}
        style={{ marginBottom: '35px' }}
      >
        添加章节
      </Button>
      {isLoading ? (
        <BaseLoading />
      ) : (
        <Tree expandedKeys={expandKeys} onExpand={handleOnExpand}>
          {treeData && treeData}
        </Tree>
      )}
    </div>
  )
}
