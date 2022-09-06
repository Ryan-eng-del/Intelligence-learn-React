import { TreeSelect } from 'antd';
import React, { useState } from 'react';
import { useShowKnowledgeTree } from 'server/fetchKnowledge';

const { TreeNode } = TreeSelect;

export const KnowledgeSeletor: React.FC<{
  related?: string[],
  callback?: (knowledgeList:string[]) => void
}> = () => {
  // const { data } = useShowKnowledgeTree()
  const [value, setValue] = useState<string[]>();
  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      multiple
      treeDefaultExpandAll
      onChange={onChange}
    >
      <TreeNode value="parent 1" title="parent 1">
        <TreeNode value="parent 1-0" title="parent 1-0">
          <TreeNode value="leaf1" title="my leaf" />
          <TreeNode value="leaf2" title="your leaf" />
        </TreeNode>
        <TreeNode value="parent 1-1" title="parent 1-1">
          <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
        </TreeNode>
      </TreeNode>
    </TreeSelect>
  );
};