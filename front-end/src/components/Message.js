import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledMessage = styled.div`
  border: ${props => props.type === 'error'
    ? props.theme.negative
    : props.theme.positive} solid 5px;
  color: ${props => props.type === 'error'
    ? props.theme.negative
    : props.theme.positive};
  font-size: 2em;
  text-align: center;
  margin: 15px;
  padding: 5px;
  box-sizing: border-box;
  background: ${props => props.theme.altBackground};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Message = ({ message }) => {
  if(!message.content){
    return(
      <></>
    )
  } else{
    return(
      <StyledMessage data-cy='message' type={message.type}>
        {message.content}
      </StyledMessage>
    )
  }
}

const mapStatesToProp = state => (
  {
    message: state.message
  }
)

export default connect(mapStatesToProp)(Message)