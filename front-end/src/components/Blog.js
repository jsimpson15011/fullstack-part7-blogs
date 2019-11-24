import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { PositiveButton } from './Button'
import Comments from './Comments'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }
  return (
    <div className="blog">
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        {props.blog.likes} likes
        <PositiveButton data-cy='like' onClick={() => props.likeBlog(props.blog)}>like</PositiveButton>
      </div>
      added by {props.blog.user.name}
      <Comments comments={props.blog.comments} blogId={props.blog.id}/>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const blogs = state.blogs
  const blog = blogs.filter(user => user.id === props.id)

  return { blog: blog[0] }
}
const mapDispatchToProps = {
  likeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)