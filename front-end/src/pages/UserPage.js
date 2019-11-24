import React from 'react'
import User from '../components/User'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const { userId } = useParams()
  return (
    <User id={userId}/>
  )
}

export default UserPage