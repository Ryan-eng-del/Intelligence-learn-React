export const findIdResource = (data: any, id: any, setResource: any) => {
  let result: any = {}
  const recursion = (data: any) => {
    if (!data) return
    data.forEach((d: any) => {
      if (d.classTimeList && d.classTimeList.length) {
        d.classTimeList.forEach((courTime: any) => {
          if (courTime.resourceList && courTime.resourceList.length) {
            courTime.resourceList.forEach((resource: any, i: any) => {
              if (resource.resourceId === id) {
                result = { ...resource }
              }
            })
          }
        })
      }
      if (d?.childChapters?.length) {
        recursion(d?.childChapters)
      }
    })
  }
  recursion(data)
  setResource(result)
  return result
}
