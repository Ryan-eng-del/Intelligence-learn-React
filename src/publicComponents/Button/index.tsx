import styled, { CSSProperties } from 'styled-components'

export const PrimaryButton = (props: { title: string; handleClick: () => void; style?: CSSProperties }) => {
  return (
    <PrimaryButtonWrapper>
      <a
        onClick={() => {
          props.handleClick()
        }}
        style={props.style}
        className="add-chapter"
      >
        {props.title}
      </a>
    </PrimaryButtonWrapper>
  )
}
const PrimaryButtonWrapper = styled.div`
  a.add-chapter {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;

    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }
`
