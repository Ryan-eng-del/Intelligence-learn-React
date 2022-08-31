export const stopPropagation = (e: any, fn: any) => {
  e.stopPropagation()
  fn()
}
