import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import { PositiveButton } from './Button'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    const usernameValue = username.value
    const passwordValue = password.value

    props.logIn(usernameValue, passwordValue)
    username.reset()
    password.reset()
  }

  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset

  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input data-cy="username" {...usernameProps}/>
      </div>
      <div>
        password
        <input data-cy="password" {...passwordProps}/>
      </div>
      <PositiveButton data-cy="login" type="submit">login</PositiveButton>
    </form>
  )
}

const mapDispatchToProps = {
  logIn
}

export default connect(null, mapDispatchToProps)(LoginForm)