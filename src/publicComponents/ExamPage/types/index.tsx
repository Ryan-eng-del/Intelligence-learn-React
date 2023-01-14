export interface paperTarget {
  classList: {
    className: string
    studentList: {
      studentId: string
      studentName: string
    }[]
  }[]
}

export interface TreeData {
  title: string
  value: string
  children: Childen[]
}

export interface Childen {
  title: string
  value: string
}

export interface PublishExamType {
  /**
   * 结束时间
   */
  endTime?: any
  /**
   * 是否允许补交
   */
  isAllowMakeUp?: number
  /**
   * 是否可以查看试卷
   */
  isAllowShowPaper?: number
  /**
   * 是否区分大小写
   */
  isDistinguishCase?: number
  /**
   * 是否取多次最高成绩
   */
  isGetHighScore?: number
  /**
   * 是否可以查看排名
   */
  isShowRank?: number
  /**
   * 是否可以查看分数
   */
  isShowScore?: number
  /**
   * 限制考试时间
   */
  limitEnterTime?: number
  /**
   * 限制提交时间
   */
  limitSubmitTime?: number
  /**
   * 限制时间
   */
  limitTime?: number
  /**
   * 试卷id
   */
  paperId: string
  /**
   * 及格分数
   */
  passScore?: number
  /**
   * 重做次数
   */
  remakeTime?: number
  /**
   * 开始时间
   */
  startTime?: any
  /**
   * 发放学生
   */
  studentIds: string[]
}

export interface PublishHomeworkType {
  /**
   * 结束时间
   */
  endTime?: string
  /**
   * 是否允许重做
   */
  isAllowMakeUp?: number
  /**
   * 是否取最高分
   */
  isGetHighScore?: number
  /**
   * 是否多选题未选全给一半分， 默认0否， 1是
   */
  isMultiHalfScore?: number
  /**
   * 试卷id
   */
  paperId: string
  /**
   * 重做次数
   */
  remakeTime?: number
  /**
   * 开始时间
   */
  startTime?: string
  /**
   * 学生id集合
   */
  studentIds: string[]
}
