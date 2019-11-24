import blogService from '../services/blogs'
import commentService from '../services/comments'
import { newMessage } from './messageReducer'

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(
      {
        type: 'GET_ALL_BLOGS',
        data: blogs
      }
    )
  }
}

export const createNewBlog = blog => {
  return async dispatch => {
    try{
      await blogService.create(blog)
      const blogs = await blogService.getAll()

      dispatch(newMessage({ content: `blog ${blog.title} by ${blog.author} added` }))

      dispatch(
        {
          type: 'GET_ALL_BLOGS',
          data: blogs
        }
      )
    } catch (e) {
      if (e.response.data.error) {
        dispatch(newMessage({ content:e.response.data.error, type:'error' }))
      } else {
        dispatch(newMessage({ content:'something went wrong please try again', type:'error' }))
      }
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try{
      await blogService.deleteBlog(blog)
      dispatch(newMessage({ content: `blog ${blog.title} by ${blog.author} removed` }))

      const blogs = await blogService.getAll()
      dispatch(
        {
          type: 'GET_ALL_BLOGS',
          data: blogs
        }
      )
    } catch (e) {
      if (e.response.data.error) {
        dispatch(newMessage({ content:e.response.data.error, type:'error' }))
      } else {
        dispatch(newMessage({ content:'something went wrong please try again', type:'error' }))
      }
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try{
      await blogService.addLike(blog)
      dispatch(newMessage({ content: `you voted for ${blog.title} by ${blog.author}` }))

      const blogs = await blogService.getAll()
      dispatch(
        {
          type: 'GET_ALL_BLOGS',
          data: blogs
        }
      )
    } catch (e) {
      if (e.response.data.error) {
        dispatch(newMessage({ content:e.response.data.error, type:'error' }))
      } else {
        dispatch(newMessage({ content:'something went wrong please try again', type:'error' }))
      }
    }
  }
}

export const addComment = (content, blogId) => {
  return async dispatch => {
    await commentService.addCommentTo(blogId, content)

    dispatch(getAllBlogs())
  }
}

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'GET_ALL_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer