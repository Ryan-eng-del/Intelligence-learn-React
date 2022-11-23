export const createVideoAndOtherArr = (fileList: any[]) => {
  const { videoProject, otherProject } = fileList.reduce(
    (pre, cur) => {
      const name = cur.name
      if (['mp4'].includes(name.slice(name.length - 3))) {
        pre.videoProject.push(cur)
      } else {
        pre.otherProject.push(cur)
      }
      return pre
    },
    { videoProject: [], otherProject: [] }
  )
  return {
    videoProject,
    otherProject
  }
}