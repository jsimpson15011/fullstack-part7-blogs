import React, { useEffect } from 'react'
import Header from './components/Header'
import UsersPage from './pages/UsersPage'
import BlogsList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { getAllBlogs, createNewBlog } from './reducers/blogReducer'
import { initialUserCheck, logIn } from './reducers/loginReducer'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import UserPage from './pages/UserPage'
import { getAllUsers } from './reducers/userReducer'
import BlogPage from './pages/BlogPage'
import styled, { ThemeProvider } from 'styled-components'

const PageWrapper = styled.div`
  color: ${props => props.theme.foreground};
  background: ${props => props.theme.background};
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding: 1.5rem;
  a{
    color: ${props => props.theme.foreground};
  }
`

const App = (props) => {
  useEffect(() => {
    props.initialUserCheck()
  }, [])
  useEffect(() => {
    props.getAllBlogs()
  }, [])
  useEffect(() => {
    props.getAllUsers()
  }, [])

  const blogFormRef = React.createRef()
  const theme = {
    background: '#373634',
    altBackground: '#21211c',
    foreground: '#d7e9cf',
    positive: '#85AD3A',
    neutral: '#87B19E',
    negative: '#C57073'
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <div className="App">
            <Header/>
            <Route exact path="/login">
              <h2>Log into application</h2>
              <Togglable buttonLabel='login'>
                {props.user ? <Redirect to="/"/> : <LoginForm/>}
              </Togglable>
            </Route>
            <Route exact path="/users">
              <UsersPage/>
            </Route>
            <Route exact path="/users/:userId">
              <UserPage/>
            </Route>
            <Route exact path="/blogs/:blogId">
              <BlogPage/>
            </Route>
            <Route exact path="/">
              {
                props.user
                  ? <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <NewBlogForm blogFormRef={blogFormRef}/>
                  </Togglable>
                  : null
              }
              <BlogsList/>
            </Route>
          </div>
        </PageWrapper>
      </ThemeProvider>
    </Router>
  )
}

const mapStateToProps = state => (
  {
    blogs: state.blogs,
    user: state.user
  }
)

const mapDispatchToProps = {
  getAllBlogs,
  createNewBlog,
  initialUserCheck,
  logIn,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
