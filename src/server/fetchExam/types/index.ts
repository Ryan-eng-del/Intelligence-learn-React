/** 目前支持的题目类型 */
export enum QuestionType {
  'single'="单选题" ,
  'multiple'="多选题"  ,
  'fillBlank'="填空题"  ,
  'shortAnswer'="简答题"  ,
  'programming'="编程题"  ,
  'judge'="判断题"
}

/** 获取的试卷的类型 */
export type TestPaper = {
  paper_name : string
  paper_id: string
  aper_detail_question_dto_list: WholeQuestion[]
}

/** 发送的试卷的类型 */
export type PostTestPaper = {
  paper_name : string
  course_id: string
  paper_type: number
  questions_score: number[] // 保存题目的分数
  questions_ids: string[] // 仅保存题目的ID
}

/** 获取的完整的题目  */
export type WholeQuestion = {
  questionId: string;
  questionDescription: string;
  questionAnswer: string;
  questionDifficulty: number;
  questionType: QuestionType;
  questionAnswerNum: number;
  rightAnswer: string;
  questionAnswerDescription: string;
  createTime: string;
  points: string[];
}

/** 发送的题目数据 (TODO:将被修改) */
export interface QuestionData {
  course_id: string
  point_ids: string[]
  question_answer?: string
  question_answer_description: string
  question_answer_num: number
  question_description: string
  question_difficulty: number
  question_type: number
  right_answer: string
}

export type ExamListItem = {
  paperId: string;
  paperName: string;
  paperType: number;
  isRelease: number;
  startTime: string;
  endTime: string;
}