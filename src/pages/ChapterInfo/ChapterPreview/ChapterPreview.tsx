import React from 'react'
import { Button } from 'antd';

export const ChapterPreview = (props: any) => {
  const { existed,openEditor } = props;
  console.log(existed);
  
  if (existed !== 'false') {
    return (  
      <div>IFramIFrame</div>
    )
  } else {
    return (  
      <div>
        你还没有上传课件
        <Button onClick={() => openEditor('file')}>上传文件</Button>
        <Button onClick={() => openEditor('rich')}>打开在线编辑器</Button>
      </div>
    )
  }
}
