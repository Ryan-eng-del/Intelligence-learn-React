import { Modal, Tree } from 'antd'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import React, { Key, useEffect, useMemo, useState } from 'react'
import { useHomeWorkListPublished } from 'server/fetchExam'
import styled from 'styled-components'
import { useImmer } from 'use-immer'
import { BaseSpin } from '../../../../../baseUI/BaseSpin/BaseSpin'

type homeworkList = {
  isReview: boolean
  paperId: string
  paperName: string
  isDone: boolean
  hasRemakeTime: number
  startTime: string
  endTime: string
}
export const UpdateHomework: React.FC<{
  handleUpHomework: any
  classId: string
}> = ({ handleUpHomework, classId }) => {
  const HomeworkListWrapper = styled.div`
    height: 427px;
  `
  const { TreeNode } = Tree
  const [isModalOpen, setIsModalOpen] = useState(false)
  const initialStuTreeSelect = { expandKeys: [], checkedKeys: [] }
  const [hwkTreeSelect, setHwkTreeSelect] = useImmer<{ expandKeys: string[]; checkedKeys: string[] }>(
    initialStuTreeSelect
  )

  const [hwkList, setHwkList] = useState<homeworkList[]>([]) // 上传作业资源的列表
  const { data: dataH } = useHomeWorkListPublished(classId) // 获取作业
  const data: homeworkList[] = useMemo(() => (dataH ? [...dataH!] : []), [dataH])
  const CheckHomeworks = (checked: string[]) => {
    const hwkChecked = data.filter((item) => checked.includes(item.paperId))
    setHwkList([...hwkList, ...hwkChecked])
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (hwkTreeSelect.checkedKeys.length === 1) {
      CheckHomeworks(hwkTreeSelect.checkedKeys)
      setIsModalOpen(false)
    } else {
      GlobalMessage('error', '一次只能添加一个作业！👋👋')
    }
  }
  useEffect(() => {
    if (hwkList.length === 1) {
      handleUpHomework(hwkList)
    }
  }, [hwkList])

  const handleCancel = () => {
    setHwkTreeSelect(initialStuTreeSelect)
    setIsModalOpen(false)
  }
  const checkHomework = (e: any) => {
    setHwkTreeSelect((draft) => {
      draft.checkedKeys = [...e.checked]
    })
  }
  // 暂时用不到扩展功能
  const handleRelateExpand = (id: Key[], info: any) => {
    console.log('扩展', info)
  }
  const getHomeworkListTreeData = () => {
    return data.map((homework) => {
      let hwkList
      return (
        <TreeNode title={homework.paperName} key={homework.paperId}>
          {hwkList}
        </TreeNode>
      )
    })
  }

  return (
    <>
      <p onClick={showModal}>现有作业</p>
      <Modal title="作业列表" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <HomeworkListWrapper>
          {data ? (
            <TreeSelected
              checkTreeData={getHomeworkListTreeData()}
              relateKeys={hwkTreeSelect.checkedKeys}
              handleRelateExpand={handleRelateExpand}
              handleRelateCheck={checkHomework}
              curCheckId={hwkTreeSelect.checkedKeys}
            />
          ) : (
            <BaseSpin size="large" />
          )}
        </HomeworkListWrapper>
      </Modal>
    </>
  )
}
