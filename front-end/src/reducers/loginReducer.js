import blogsService from '../services/blogs'
import loginService from '../services/login'
import { newMessage } from './messageReducer'

export const initialUserCheck = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: {
          user: user
        }
      })
    }
  }
}

export const logIn = (username, password) => {
  return async dispatch => {
    try {
      const credentials = { 'username': username, 'password': password }
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOG_IN',
        data: {
          user: user
        }
      })
      blogsService.setToken(user.token)
    } catch (e) {
      dispatch(newMessage({ content: e.response.data.error, type: 'error' }))
    }
  }
}

export const logOut = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    blogsService.setToken(null)
    dispatch({
      type:'LOG_OUT'
    })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data.user
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

export default loginReducer