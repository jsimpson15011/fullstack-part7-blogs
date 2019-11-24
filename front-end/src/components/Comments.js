import React from 'react'
import styled from 'styled-components'
import { PositiveButton } from './Button'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentContainer = styled.ul`
  border: solid 1px ${props => props.theme.foreground};
  li{
    padding: 5px;
  }
  li:nth-child(even){
    background: ${props => props.theme.altBackground};
  }
`

const Comments = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    props.addComment(event.target.comment.value, props.blogId)

    event.target.comment.value=''
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input data-cy='comment-field' type='text' name='comment'/>
        <PositiveButton data-cy='add-comment'>Add Comment</PositiveButton>
      </form>
      <CommentContainer>
        {props.comments.map(comment => {
          return (
            <li data-cy='comment' key={comment.id}>{comment.comment}</li>
          )
        })}
      </CommentContainer>
    </div>
  )
}

export default connect(null,{ addComment })(Comments)