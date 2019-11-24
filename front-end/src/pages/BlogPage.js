import React from 'react'
import Blog from '../components/Blog'
import { useParams } from 'react-router-dom'

const BlogPage = () => {
  const { blogId } = useParams()

  return (
    <Blog id={blogId}/>
  )
}

export default BlogPage