/** 知识点树的节点类型 */
export type KnowledgeNodeType = {
  pointId: string
  pointName: string
  pointPid?: string //仅后端有用，可以考虑删除
  children: KnowledgeNodeType[]
  prePoints: RelateNodeType[]
  afterPoints: RelateNodeType[]
}

/** 同样是知识点节点，不过作为外键只需要保留的信息 */
export type RelateNodeType = {
  pointId: string
  pointName: string
}

/** KnowledgeNodeType类型的初始化数据，这样就不会出现undefined */
export const KnowledgeNodeType_init: KnowledgeNodeType = {
  pointId: '',
  pointName: '',
  children: [],
  prePoints: [],
  afterPoints: []
}

// 测试数据
// const TestData: KnowledgeNodeType[] = [
//   {
//       pointId: "1548237301487091714",
//       pointName: "命题规则",
//       pointPid: "555",
//       children: [
//           {
//               pointId: "1558262141767667713",
//               pointName: "命题规则1",
//               pointPid: "1548237301487091714",
//               children: [
//                   {
//                       pointId: "1558264003279474690",
//                       pointName: "命题规则1（1）",
//                       pointPid: "1558262141767667713",
//                       children: [],
//                       prePoints: [],
//                       afterPoints: []
//                   },
//                   {
//                       pointId: "1558264044052303874",
//                       pointName: "命题规则1（2）",
//                       pointPid: "1558262141767667713",
//                       children: [],
//                       prePoints: [],
//                       afterPoints: []
//                   }
//               ],
//               prePoints: [],
//               afterPoints: []
//           },
//           {
//               pointId: "1558262788751642625",
//               pointName: "命题规则2",
//               pointPid: "1548237301487091714",
//               children: [],
//               prePoints: [],
//               afterPoints: []
//           }
//       ],
//       prePoints: [
//           {
//               pointId: "1548237376028262402",
//               pointName: "真命题"
//           },
//           {
//               pointId: "1548237398266462210",
//               pointName: "假命题"
//           }
//       ],
//       afterPoints: [
//           {
//               pointId: "1558262141767667713",
//               pointName: "命题规则1"
//           },
//           {
//               pointId: "1558262788751642625",
//               pointName: "命题规则2"
//           }
//       ]
//   },
//   {
//       pointId: "1548237344227049474",
//       pointName: "命题内容",
//       pointPid: "555",
//       children: [],
//       prePoints: [],
//       afterPoints: []
//   },
//   {
//       pointId: "1548237376028262402",
//       pointName: "真命题",
//       pointPid: "555",
//       children: [],
//       prePoints: [],
//       afterPoints: []
//   },
//   {
//       pointId: "1548237398266462210",
//       pointName: "假命题",
//       pointPid: "555",
//       children: [],
//       prePoints: [],
//       afterPoints: []
//   }
// ]
