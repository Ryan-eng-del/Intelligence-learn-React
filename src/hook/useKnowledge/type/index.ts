export interface IKnowledgePoint {
  afterPoints: AfterPoint[]
  children: IKnowledgePoint[]
  pointId: string
  pointName: string
  pointPid: string
  prePoints: PrePoint[]
}

export interface AfterPoint {
  pointId: string
  pointName: string
}

export interface PrePoint {
  pointId: string
  pointName: string
}
