import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export const Explain: React.FC<any> = (props) => {
  const [html, setHtml] = useState('')
  const { handleEdit } = props

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [foucs, setFouce] = useState(false)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: []
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...'
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
      <div
        style={{ border: '1px solid #ccc', zIndex: 100 }}
        onFocus={() => setFouce(true)}
        onBlur={() => setFouce(false)}
      >
        {foucs ? (
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
        ) : (
          <></>
        )}
        {/* 富文本编辑器的输入框子 */}
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            //用Html的形式记录，而不是纯文本
            setHtml(editor.getHtml())
            handleEdit(editor.getHtml())
          }}
          mode="default"
          style={{ height: '50px', overflowY: 'hidden', width: '824px' }}
        />
      </div>
      {/* 预览效果 */}
      {/* <div style={{ marginTop: '15px' }}>{'s' + html}</div> */}
    </>
  )
}
