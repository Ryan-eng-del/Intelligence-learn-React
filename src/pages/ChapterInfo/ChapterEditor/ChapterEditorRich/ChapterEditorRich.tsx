import '@wangeditor/editor/dist/css/style.css' // 引入 css
// import { store } from 
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Boot, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'
Boot.registerModule(formulaModule)

export const ChapterEditorRich: React.FC   = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
  const [html, setHtml] = useState('<p>hello</p>') // 编辑器内容

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello&nbsp;world</p>')
    }, 1500)
  }, [])

  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
      index: 0,
      keys: [
        'insertFormula', // “插入公式”菜单
        // 'editFormula' // “编辑公式”菜单
      ],
    },
  }
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    // 选中公式时的悬浮菜单
    hoverbarKeys: {
      formula: {
        menuKeys: ['editFormula'], // “编辑公式”菜单
      },
    },
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
      <div style={{ border: '1px solid #ccc', zIndex: 100}}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        {html}
      </div>
    </>
  )
}
