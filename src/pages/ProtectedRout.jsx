import React, { useEffect } from 'react'
import { useAuthentication } from '../context/FakeAuthContextAPI'
import { useNavigate } from 'react-router-dom'

const ProtectedRout = ({children}) => {
    const {isAuthenticated} = useAuthentication()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated) navigate('/')
    },[isAuthenticated,navigate])
  return isAuthenticated? children : null
   
}

export default ProtectedRout