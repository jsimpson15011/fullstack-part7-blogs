import React from 'react'
import { getAllUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserTable = styled.table`
  background: ${props => props.theme.altBackground};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  *{
    padding: .5em;
  }
  tr:nth-child(odd){
    background: ${props => props.theme.background};
  }
  th{
    background: ${props => props.theme.neutral};
    border: transparent;
    color: white;
  }
`
const UsersPage = (props) => {
  const mappedUsers = props.allUsers.map(user => {
    return(
      <tr key={user.id}>
        <td data-cy='user-name'><Link to={`/users/${user.id}`} >{user.name}</Link></td>
        <td data-cy='blog-number'>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <>
      <h2>Users</h2>
      <UserTable>
        <tbody>
          <tr>
            <th/>
            <th>blogs created</th>
          </tr>
          {mappedUsers}
        </tbody>
      </UserTable>
    </>

  )
}

const mapStateToProps = state => {
  const usersSortedByBlogs = state.allUsers.sort((a, b) => {
    return b.blogs.length - a.blogs.length
  })

  return ({ allUsers: usersSortedByBlogs })
}

const mapDispatchToProps = {
  getAllUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)