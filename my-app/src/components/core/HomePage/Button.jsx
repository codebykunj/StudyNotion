import React from 'react'
import { Link } from 'react-router-dom'

export const Button  = ({ children,active,linkto}) => {
  return (
    <Link to={linkto}>
    <div className={`rounded-lg px-7 py-3  ${active?"bg-yellow-200 text-richblack-900":"bg-richblack-700 text-white  border-richblack-400 border-r border-b "}`}> 
    <div className='text-lg'> { children} </div>
    </div>
    </Link>
  )
}




