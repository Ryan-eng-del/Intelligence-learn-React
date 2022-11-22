import React from 'react'
import styled from 'styled-components'

const ChapterTreeContent: React.FC<{
  contentName: string
  handleDeleteTreeContent: any
  contentId: string
  handleDeleteResource: any
  editable: boolean
}> = ({ editable, contentName, handleDeleteTreeContent, contentId }) => {
  return (
    <>
      <ChapterTreeContentWrapper>
        <div style={{ display: 'flex' }}>
          <div>{contentName}</div>
          {editable && (
            <EditToolWrapperContent className={'edit-content-tool-wrapper'} onClick={(e) => e.stopPropagation()}>
              <span>编辑</span>
              <span onClick={() => handleDeleteTreeContent(contentId, 'courTimes')}>删除</span>
            </EditToolWrapperContent>
          )}
        </div>
      </ChapterTreeContentWrapper>
    </>
  )
}
/*样式*/
export const EditToolWrapperContent = styled.div`
  opacity: 0;
  transition: 0.3s opacity var(--easing);
  position: absolute;
  right: 0;

  span {
    color: rgb(58, 139, 255);
    margin-left: 20px;
  }

  button {
    margin-right: 14px;
  }
`
const ChapterTreeContentWrapper = styled.div`
  &:hover .edit-content-tool-wrapper {
    opacity: 1;
  }
`

/*memo性能优化*/
export default React.memo(ChapterTreeContent)
