import BlogLink from './BlogLink'
import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { logOut } from '../reducers/loginReducer'

const BlogsList = (props) => {
  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <BlogLink
          key={blog.id}
          blog={blog}
          user={props.user}
          handleLike={() => props.likeBlog(blog)}
          handleDelete={() => props.deleteBlog(blog)}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const blogsSortedByLikes = state.blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return ({
    blogs: blogsSortedByLikes,
    user: state.user
  })
}
const mapDispatchToProps = {
  deleteBlog,
  likeBlog,
  logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogsList)