import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
export default function LeftNav() {
  return (
    <div className=' border-orange-300 h-full w-8/12 mx-auto border-2 rounded-md shadow-inner flex flex-col justify-between'>
      <div className='flex flex-col justify-around mt-5'>
        <div className='flex flex-col items-center justify-center mb-10'>
          <span className='text-orange-400 text-5xl'>
            <FaUsers/>
          </span>
          <span className='text-xl font-bold'>
            لیست کاربران
          </span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-orange-400 text-5xl'>
            <MdGroupAdd/>
          </span>
          <span className='text-xl font-bold'>
            ایجاد کاربر 
          </span>
        </div>
      </div>
      
      <div className='flex items-center justify-center'>
        <span>
          <FaChevronDown/>
        </span>
          
          <span className='text-xl font-bold'>
            ادمین
          </span>
          <span className='text-orange-400 text-4xl m-2 mb'>
            <IoPersonCircle/>
          </span>
        </div>

    </div>
  )
}
