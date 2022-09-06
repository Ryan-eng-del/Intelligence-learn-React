import { UseQueryResult } from "@tanstack/react-query"

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

// ！！ 如果你将state的类型设置为any，则他的dispatch函数是此类型
// const [thing,setThing] = useState<any>({})
//               👆 类型是React.Dispatch<any>
// export type StateSetter<T> = React.Dispatch<T>


export type QueryHookFn= ( arg: any ) => UseQueryResult<any,unknown>
