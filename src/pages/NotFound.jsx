import React from 'react'
import notfoundimg from '../images/404.jpg'
export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <img  src={notfoundimg} />
      <p className='font-bold text-3xl italic text-blue-700'> Page Not Found</p>
    </div>
  )
}
