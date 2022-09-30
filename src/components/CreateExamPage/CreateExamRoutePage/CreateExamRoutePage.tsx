import React, { useState } from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import {
  SingleChoice,
  MultipleChoice,
  FillBlank,
  ShortAnswer,
  Judge
} from 'publicComponents/CreateQuestionPage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'
import { Tabs } from 'antd'
import { SingleChoiceP } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/SingleChoiceP'
import { SubjectivePreview } from 'publicComponents/CreateQuestionPage/QuestionType/Component/SubjectivePreview'


const CreateExamRoute: React.FC<{
  Consumer: React.Consumer<QuestionDataWithID | undefined>
  dispatch?: any
  mode?: "preview" | "edit"
}> = ({ Consumer, mode }) => {
  const [Mode, setMode] = useState(mode || "edit")
  const mapper = (context: QuestionDataWithID) => ({
    edit:{
      [QuestionType.single]:<SingleChoice content={context}/>,
      [QuestionType.multiple]:<MultipleChoice content={context}/>,
      [QuestionType.shortAnswer]:<ShortAnswer content={context}/>,
      [QuestionType.judge]:<Judge content={context}/>,
      [QuestionType.fillBlank]:<FillBlank content={context}/>
    },
    preview:{
      [QuestionType.single]:<SingleChoiceP content={context}/>,
      [QuestionType.multiple]:<MultipleChoice content={context}/>,
      [QuestionType.shortAnswer]:<SubjectivePreview content={context}/>,
      [QuestionType.judge]:<Judge content={context}/>,
      [QuestionType.fillBlank]:<SubjectivePreview content={context}/>,
    }
  })
  return (
    <CreateExamRoutePageWrapper>
      <Tabs activeKey={Mode} centered onChange={(k)=>k?setMode(k as typeof Mode):0}>
        <Tabs.TabPane tab="编辑模式" key="edit"/>
        <Tabs.TabPane tab="预览模式" key="preview"/>
      </Tabs>
      <Consumer>
        {
          context => context
            ? mapper(context)[Mode][context?.questionType as QuestionType]
            : <h1>空状态</h1>
        }
      </Consumer>
    </CreateExamRoutePageWrapper>
  )
}

export const CreateExamRoutePage = React.memo(CreateExamRoute)