
export interface paperTarget {
  classList: {
    className: string,
    studentList: {
      studentId: string,
      studentName: string,
    }[]
  }[]
}

export interface TreeData {
  title: string,
  value: string,
  children: Childen[]
}

export interface Childen {
  title: string,
  value: string,
}

export interface PublishExamType {
  /**
   * 结束时间
   */
  end_time?: string;
  /**
   * 是否允许补交
   */
  is_allow_make_up?: number;
  /**
   * 是否可以查看试卷
   */
  is_allow_show_paper?: number;
  /**
   * 是否区分大小写
   */
  is_distinguish_case?: number;
  /**
   * 是否取多次最高成绩
   */
  is_get_high_score?: number;
  /**
   * 是否可以查看排名
   */
  is_show_rank?: number;
  /**
   * 是否可以查看分数
   */
  is_show_score?: number;
  /**
   * 限制考试时间
   */
  limit_enter_time?: number;
  /**
   * 限制提交时间
   */
  limit_submit_time?: number;
  /**
   * 限制时间
   */
  limit_time?: number;
  /**
   * 试卷id
   */
  paper_id?: string;
  /**
   * 及格分数
   */
  pass_score?: number;
  /**
   * 重做次数
   */
  remake_time?: number;
  /**
   * 开始时间
   */
  start_time?: string;
  /**
   * 发放学生
   */
  student_ids: string[];
}

export interface PublishHomeworkType {
  /**
   * 结束时间
   */
  end_time?: string;
  /**
   * 是否允许重做
   */
  is_allow_make_up?: number;
  /**
   * 是否取最高分
   */
  is_get_high_score?: number;
  /**
   * 试卷id
   */
  paper_id?: string;
  /**
   * 重做次数
   */
  remake_time?: number;
  /**
   * 开始时间
   */
  start_time?: string;
  /**
   * 学生id集合
   */
  student_ids: string[];
}
