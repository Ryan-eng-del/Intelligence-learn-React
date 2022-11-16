import { Modal } from 'antd'
import { useEffect } from 'react'
import { generateKnowledgeKeys } from 'helper/knowledgeTree'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { TreeSelected } from './cpn/TreeSelected'
import { LoadingWrapper } from './cpn/LodingWrapper'

export const KnowledgeTree = (props: { treeData: any; knowledgeControl: Record<string, any> }) => {
  const { knowledgeControl, treeData } = props
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)

  useEffect(() => {
    knowledgeControl.dispatch({ type: 'setExpandKeys', expandKeys: () => generateKnowledgeKeys(knowledgeControl.data) })
  }, [knowledgeControl.data])
  return (
    <div>
      <Modal
        title={knowledgeControl.curOrder}
        visible={knowledgeControl.isModalVisible}
        onOk={knowledgeControl.handleOk}
        onCancel={knowledgeControl.handleCancel}
      >
        <TreeSelected
          curCheckId={knowledgeControl.curCheckId}
          checkTreeData={checkTreeData}
          handleRelateExpand={knowledgeControl.handleRelateExpand}
          handleRelateCheck={knowledgeControl.handleRelateCheck}
          relateKeys={knowledgeControl.relateKeys}
        />
      </Modal>
      <LoadingWrapper
        isLoading={knowledgeControl.isLoading}
        treeData={treeData}
        handleExpand={knowledgeControl.handleExpand}
        handleSelect={knowledgeControl.handleExpand}
        expandKeys={knowledgeControl.knowledgeState.expandKeys}
      />
    </div>
  )
}
