export const delayFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1500)
  })
}
