/** 目前支持的题目类型 */
export enum QuestionType {
  'single',
  'multiple',
  'fillBlank',
  'shortAnswer',
  'judge'
}

///////////////////////////////////////////////////////////////（网络实体）

/** （网络实体）获取的试卷的类型 */
export type TestPaper = {
  paperName: string
  paperId: string
  questionOfPaperVos: WholeQuestion[] & { score: number }
}

/** （网络实体）发送的试卷的类型 */
export type PostTestPaper = {
  paperName: string
  courseId: string
  questionsScore: number[] // 保存题目的分数
  questionsIds: string[] // 仅保存题目的ID
}
/////////////////////////////////////////////////////////////// （本地类型）

/** （本地类型）题目在试卷中的类型 */
export interface QuestionItem {
  score: number //题目在此试卷的分数
  item_data: QuestionDataWithID //这里保存的类型可以直接发送
}

/** （本地类型）试卷编辑导航一种题型的折叠面板(type唯一) */
export interface QuestionList {
  type: QuestionType //题目类型
  name: string
  defaultScore: number
  min: number
  max: number
  amount: number //题目总数
  isExists: boolean //表示该类型题目是否已经存在
  questiton: QuestionItem[] // ↑上面那种类型
}

///////////////////////////////////////////////////////////////（网络实体）
type QuestionContext = {
  questionDescription: string //解析
  questionOption: string // 选项集合
  questionDifficulty: number // 难易度
  questionType: QuestionType // 题目类型
  questionAnswerNum: number // 答案个数
  rightAnswer: string // 正确答案
  questionAnswerExplain: string // 答案描述
  pointIds: string[] // 关联知识点
}

/** （网络实体）发送的题目数据 */
export type QuestionData = QuestionContext & {
  courseId: string
}

/** 修改的题目实体 */
export type QuestionDataWithID = QuestionData & {
  questionId: string
}

/** （网络实体）获取的完整的题目  */
export type WholeQuestion = QuestionDataWithID & {
  createTime: string // 创建时间
  questionAnswerNum: number // 答案个数
}

///////////////////////////////////////////////////////////////（网络实体）

/** （网络实体）发布的试卷结构 */
export type ExamListItem = {
  paperId: string
  paperName: string
  paperType: number
  isRelease: number
  startTime: string
  endTime: string
}

// 试题库
export type QuestionBank = {
  createTime: string
  questionDescription: string
  questionDifficulty: number
  questionId: string
  questionOption: string
  questionType: number
  rightAnswer: string
}

export type Item = {
  key: string
  question: string
  rate: string
  type: string
  creator: string
  create_time: string
  questionId: string
  rightAnswer: string
  questionOption: string
}

///////////////////////////////////////// 学生试卷
export interface StudentPaper {
  paperId: string
  paperName: string
  questionOfPaperVos: StudentPaperItem[]
}

export interface StudentPaperItem {
  questionId: string
  questionDescription: string
  questionType: QuestionType
  questionScore?: number
  questionAnswerNum: number
  questionOrder?: number
  questionOption: string
}
