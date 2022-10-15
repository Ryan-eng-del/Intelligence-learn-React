import { read, utils } from 'xlsx'

interface President {
  Name: string
  Index: number
}

export const TestExcel = () => {
  return (
    <>
      <input
        type="file"
        onChange={async (e) => {
          /* get data as an ArrayBuffer */
          if (e.target?.files) {
            const file = e.target.files[0]
            const data = await file.arrayBuffer()
            const wb = read(data)
            /* parse and load first worksheet */
            const re = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]])
            console.log(re, 're')

            const ws = wb.Sheets[wb.SheetNames[0]]
          }
        }}
      />
    </>
  )
}
