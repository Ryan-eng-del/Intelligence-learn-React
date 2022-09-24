/** 章节树的类型 */
export type ChapterNodeType = {
  chapterId: string
  name: string
  chapterOrder: number
  courseId: string
  courTimes?: CourTimeType[] //此字段似乎不是什么时候都存在
  childChapters: ChapterNodeType[]
}

/** 章节树中的课时的类型 */
export type CourTimeType = {
  id: string
  name: string
  resource: ChapterResourceType[]
}

/** 章节树中的课时的资源的类型 */
export type ChapterResourceType = {
  type: string
  resourceName: string
  resourceId: string
}

/** 用于ChapterNodeType类型初始化，就不会出现undefined */
export const ChapterNodeType_init: ChapterNodeType = {
  chapterId: '',
  name: '',
  chapterOrder: 1,
  courseId: '',
  courTimes: [],
  childChapters: []
}

// 测试数据
// const TestData:ChapterNodeType[] =  [
//       {
//           chapterId: "1518",
//           name: "第一章",
//           chapterOrder: 1,
//           courseId: "1547211425930256386",
//           courTimes: [],
//           childChapters: [
//               {
//                   chapterId: "15482205167745",
//                   name: "第一章 第一节",
//                   chapterOrder: 1,
//                   courseId: "1547211425930256386",
//                   courTimes: [
//                       {
//                           id: "1523930",
//                           name: "课时1",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时1视频.video",
//                                   id: "1"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时1课件.pdf",
//                                   id: "2"
//                               },
//                               {
//                                   type: "作业",
//                                   name: "课时1作业",
//                                   id: "23"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               },
//               {
//                   chapterId: "1548285518888961",
//                   name: "第一章 第二节",
//                   chapterOrder: 2,
//                   courseId: "154125986",
//                   courTimes: [
//                       {
//                           id: "152393090391042",
//                           name: "课时2",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时2视频.video",
//                                   id: "3"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时2课件.pdf",
//                                   id: "4"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               },
//               {
//                   chapterId: "15482855104513",
//                   name: "第一章 第三节",
//                   chapterOrder: 3,
//                   courseId: "1547211425930256386",
//                   courTimes: [
//                       {
//                           id: "1523391042",
//                           name: "课时3",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时3视频.video",
//                                   id: "5"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时3课件.pdf",
//                                   id: "6"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               }
//           ]
//       },
//       {
//           chapterId: "159989644418",
//           name: "第二章",
//           chapterOrder: 1,
//           courseId: "1547211425930256386",
//           childChapters: [
//               {
//                   chapterId: "15404075167745",
//                   name: "第二章 第一节",
//                   chapterOrder: 1,
//                   courseId: "15472115930256386",
//                   courTimes: [
//                       {
//                           id: "152393042",
//                           name: "课时1",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时1视频.video",
//                                   id: "7"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时1课件.pdf",
//                                   id: "8"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               },
//               {
//                   chapterId: "154518888961",
//                   name: "第二章 第二节",
//                   chapterOrder: 2,
//                   courseId: "15472114250256386",
//                   courTimes: [
//                       {
//                           id: "1521042",
//                           name: "课时2",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时2视频.video",
//                                   id: "10"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时2课件.pdf",
//                                   id: "11"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               },
//               {
//                   chapterId: "150375104513",
//                   name: "第二章 第三节",
//                   chapterOrder: 3,
//                   courseId: "1547211420256386",
//                   courTimes: [
//                       {
//                           id: "15291042",
//                           name: "课时3",
//                           resource: [
//                               {
//                                   type: "视频",
//                                   name: "课时3视频.video",
//                                   id: "13"
//                               },
//                               {
//                                   type: "课件",
//                                   name: "课时3课件.pdf",
//                                   id: "14"
//                               }
//                           ]
//                       }
//                   ],
//                   childChapters: []
//               }
//           ]
//       }
//   ]
