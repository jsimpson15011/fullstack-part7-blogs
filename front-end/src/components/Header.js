import React from 'react'
import Message from './Message'
import Navigation from './Navigation'


const Header = () => {
  return(
    <div className="header">
      <h1>blogs</h1>
      <Message/>
      <Navigation/>
    </div>
  )
}

export default Header