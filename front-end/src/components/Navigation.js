import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { NegativeButton } from './Button'

const StyledNav = styled.div`
  background: ${props => props.theme.altBackground};
  > *{
    border: solid ${props => props.theme.foreground};
    margin-right: 5px;
  }
  display: flex;
  align-items: center;
  font-size: 1.5em;
  a{
    background: ${props => props.theme.background};
    padding: .5em;
    text-decoration: none;
    :hover{
      color: ${props => props.theme.positive };
    }
  }
`

const Navigation = (props) => {
  const history = useHistory()
  const handleClick = () => {
    props.logOut()
    history.push('/login')
  }

  return (
    <StyledNav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {props.user
        ? <>
          {`${props.user.name} logged in`}
          <NegativeButton data-cy='logout' onClick={() => {
            handleClick()
          }}>
            Log out
          </NegativeButton>
        </>
        : <Link to="/login">Login</Link>}
    </StyledNav>
  )
}

const mapStateToProps = state => {
  return ({
    user: state.user
  })
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)