import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
export default function BackYoHome() {
    return (
        <div className='flex items-center justify-center'>
            <Link to='/' className='flex items-center'>
            <span className='font-black text-xl text-gray-800'>برگشت به صفحه قبل</span>
            <span className='mx-3 text-gray-300 text-3xl'>
                <FaArrowLeftLong />
            </span>
            </Link>
           

        </div>
    )
}
