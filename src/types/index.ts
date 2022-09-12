import { UseQueryResult } from "@tanstack/react-query"

/** useState 的 Setter 函数类型 */
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

// ！！ 如果你将state的类型设置为any，则他的dispatch函数是此类型
// const [thing,setThing] = useState<any>({})
//               👆 类型是React.Dispatch<any>
// export type StateSetter<T> = React.Dispatch<T>

/** 返回useQuery的 Hook 函数类型 */
export type QueryHookFn= ( ...args: any[] ) => UseQueryResult<any,unknown>

/** 任意函数 类型  ，可以指定返回值  */
export type AnyFn<T = any> = ( ...args: any[] ) => T