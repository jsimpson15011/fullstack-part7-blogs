import styled from 'styled-components'

export const Button = styled.button`
  font-size: 1em;
  padding: .25em 1em;
  border-radius: 3px;
  margin: 5px;
  color: ${props => props.theme.neutral};
  border: 2px solid ${props => props.theme.neutral};
  background: white;
  :hover{
    background: ${props => props.theme.neutral};
    color: white;
  }
`

export const PositiveButton = styled(Button)`
  color: white;
  background: ${props => props.theme.positive};
  :hover{
    border: 2px solid ${props => props.theme.positive};
    background: white;
    color: ${props => props.theme.positive};
  }
`

export const NegativeButton = styled(PositiveButton)`
  background: ${props => props.theme.negative};
  border: 2px solid ${props => props.theme.negative};
  :hover{
    border: 2px solid ${props => props.theme.negative};
    color: ${props => props.theme.negative};
  }
`