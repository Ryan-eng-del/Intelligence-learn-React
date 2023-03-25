const Open = true

/** 这个组件用来标记应用中未完成的部分，仅在 dev 环境下显示。 你可以右键此标签，选择查找引用来找到应用中有多少没有完成的地方 */
export const Unaccomplished = (props: any) => {
  return Open && process.env.NODE_ENV == 'development' ? (
    <div style={{ color: 'red' }}>未完成：{props.children}</div>
  ) : (
    <></>
  )
}