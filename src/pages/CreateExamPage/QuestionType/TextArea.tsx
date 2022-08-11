import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export const TextArea: React.FC<any> = (props) => {
// editor 实例
const [editor, setEditor] = useState<IDomEditor | null>(null)
const [foucs, setFouce] = useState(false)
const { html, setHtml } = props

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [

  ]
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
}

// 及时销毁 editor ，重要！
useEffect(() => {
    return () => {
        if (editor == null) return
        editor.destroy()
        setEditor(null)
    }
}, [editor])

return (
  <>
    <div style={{ border: '1px solid #ccc', zIndex: 100}}
      onFocus={()=>setFouce(true)} onBlur={()=>setFouce(false)}>
      {
        foucs ? <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        /> : <></>
      }
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={editor => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: '100px', overflowY: 'hidden' }}
      />
    </div>
    {/* 预览效果 */}
    {/* <div style={{ marginTop: '15px' }}>
      {html}
    </div> */}
  </>
)
}
