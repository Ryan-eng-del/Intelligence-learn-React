export const findIdResource = (data: any, id: any, setResource: any) => {
  const result: any = []
  const recursion = (data: any) => {
    if (!data) return
    data.map((d: any) => {
      if (d.courTimes && d.courTimes.length) {
        d.courTimes.forEach((courTime: any) => {
          if (courTime.resource && courTime.resource.length) {
            courTime.resource.forEach((resource: any, i: any) => {
              if (resource.id === id) {
                result.push(resource)
              }
            })
          }
        })
      }
      if (d.childChapters.length) {
        recursion(d.childChapters)
      }
    })
  }
  console.log(result, 'result')
  recursion(data)
  setResource(result)
}
