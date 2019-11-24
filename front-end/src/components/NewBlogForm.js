import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { getAllUsers } from '../reducers/userReducer'
import { PositiveButton } from './Button'

const NewBlogForm = (props) => {
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')

  const blogTitleProps = Object.assign({}, blogTitle)
  delete blogTitleProps.reset

  const blogAuthorProps = Object.assign({}, blogAuthor)
  delete blogAuthorProps.reset

  const blogUrlProps = Object.assign({}, blogUrl)
  delete blogUrlProps.reset

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    props.blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      user: props.user.id
    }

    await props.createNewBlog(newBlog)

    props.getAllUsers()

    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input data-cy='blog-title' {...blogTitleProps}/>
        </div>
        <div>
          author:
          <input data-cy='blog-author' {...blogAuthorProps}/>
        </div>
        <div>
          url:
          <input data-cy='blog-url' {...blogUrlProps}/>
        </div>
        <PositiveButton data-cy='create' type="submit">create</PositiveButton>
      </form>
    </div>
  )
}

const mapStateToProps = state => (
  {
    user: state.user
  }
)

const mapDispatchToProps = {
  createNewBlog,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm)