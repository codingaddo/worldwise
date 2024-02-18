import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const BackBotton = () => {
  const navigate = useNavigate()

  return (
    <Button type='back' onClick={(e)=>{
        e.preventDefault() 
        navigate(-1)
        }
        }>&larr; Back</Button>
  )
}

export default BackBotton
