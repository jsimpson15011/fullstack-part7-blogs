import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBlogLink = styled.div`
  background: ${props => props.theme.altBackground};
      border: solid 1px;
      margin-bottom: 5px;
      padding: 5px;
      font-size: 1.5em;
      text-align: center;
      a{
        text-decoration: none;
      }
      }
      :hover{
        a{
          color: ${props => props.theme.altBackground}
        };
        background: ${props => props.theme.foreground};
      }
`

const BlogLink = ({ blog }) => {
  return (
    <StyledBlogLink data-cy='blog-link'>
      <Link to={`/blogs/${blog.id}`}>
        <div className="name-and-author">
          {blog.title} <span style={ { fontStyle:'italic' } }>{blog.author}</span>
        </div>
      </Link>
    </StyledBlogLink>
  )
}

export default BlogLink