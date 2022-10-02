import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {
  Boot,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig
} from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'
Boot.registerModule(formulaModule)

export const TextArea: React.FC<any> = (props: {
  content: string
  setContent: (content: string) => void
  style?: object
}) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [foucs, setFouce] = useState(false)
  const { content, setContent, style } = props

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
      index: 0,
      keys: [
        'insertFormula' // “插入公式”菜单
      ]
    },
    excludeKeys: [
      //禁用工具
      'blockquote', //引用
      'color', //字体颜色
      'bgColor', //字体背景要是
      'fontFamily', //字体
      'lineHeight', //行距
      'bulletedList', //有序列表
      'numberedList', //无序列表
      'todo', //代表列表
      'emotion' //emoji
    ]
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    hoverbarKeys: {
      formula: {
        menuKeys: ['editFormula'] // “编辑公式”菜单
      }
    }
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
            style={{ zIndex: 1, borderBottom: '1px solid #ccc' }}
          />
        ) : (
          <></>
        )}
        <Editor
          defaultConfig={editorConfig}
          value={content}
          onCreated={setEditor}
          onChange={(editor) => setContent(editor.getHtml())}
          mode="default"
          style={style}
        />
      </div>
      {/* 预览效果 */}
      {/* <div style={{ marginTop: '15px' }}>
        {html}
      </div> */}
    </>
  )
}

//  调试行： 调整工具栏时将此行复制到页面内查看工具名称
{
  /* <Button onClick={()=>console.log(DomEditor.getToolbar(editor as IDomEditor)?.getConfig())}>2333</Button> */
}
