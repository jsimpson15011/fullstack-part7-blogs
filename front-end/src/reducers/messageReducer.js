const changeMessage = message => {
  return {
    type: 'NEW_MESSAGE',
    data: {
      ...message
    }
  }
}

export const newMessage = (message) => {
  return dispatch => {
    dispatch(changeMessage(message))

    setTimeout(() => {
      dispatch(changeMessage(''))
    }, 5000)
  }
}

const messageReducer = (state = { content:'' }, action) => {
  if (action.type === 'NEW_MESSAGE') {
    return {
      content: action.data.content,
      type: action.data.type
    }
  } else {
    return state
  }
}

export default messageReducer