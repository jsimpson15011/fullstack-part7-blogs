import React from 'react'
import BlogLink from './BlogLink'
import { render, fireEvent } from '@testing-library/react'

describe('<BlogLink />', () => {
  let component
  const blog = {
    title: 'Test BlogLink',
    author: 'Test Author',
    url: 'Test Url',
    likes: 0,
    user: {
      name: 'test name',
      username: 'test username'
    }
  }
  const user = {
    name: 'test name',
    username: 'test username'
  }
  beforeEach(() => {
    component = render(
      <BlogLink
        blog={blog}
        user={user}
      />
    )
  })

  test('only blog name and author visible initially', () => {
    const nameAndAuthor = component.container.querySelector('.name-and-author')
    const blogDetails = component.container.querySelector('.blog-details')

    expect(nameAndAuthor).toHaveTextContent('Test BlogLink Test Author')
    expect(blogDetails).toHaveStyle('display:none')
  })

  test('blog details show when post is clicked', () => {
    const nameAndAuthor = component.container.querySelector('.name-and-author')
    fireEvent.click(nameAndAuthor)

    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).not.toHaveStyle('display:none')
  })
})