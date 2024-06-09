import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from 'react';
export default function UploadFile() {
    const [progress, setProgress] = useState(0);
    const handelremove=()=>{

    }
    return (
        <div className='border border-gray-100 shadow-2xl rounded-lg md:mx-6 mx-1 p-5 mb-10'>
            <div className='flex justify-between items-center md:mx-5 mx-2'>
                <p className='text-xl font-semibold'>Document-1</p>
                {
                    progress === 100 && <div className='text-lg text-green-500'>
                        <FaCheckCircle />
                    </div>
                }
                <div className='text-3xl text-red-500 font-bold cursor-pointer hover:scale-110 duration-200 ' onClick={handelremove}>
                    <CiCircleRemove />
                </div>


            </div>
            <div className='mx-6 mt-1'>
                <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-end mb-1">
                    <span className="text-sm font-medium text-gray-400 dark:text-white">45%</span>
                </div>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 text-xl font-semibold text-center flex items-center hover:scale-105 duration-200'><span className='text-center mt-2 mr-2 text-2xl '><IoSettingsOutline /></span>ویرایش </button>
                        <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 text-xl font-semibold text-center flex items-center  hover:scale-105 duration-200'><span className='text-center mt-2 mr-2 text-2xl text-red-600 '><RiDeleteBin6Line /></span>حذف </button>
                    </div>
                    <div className='flex'>
                        <button className='bg-orange-300 rounded-xl font-semibold text-xl shadow-2xl border-[3px] border-orange-100 px-5  hover:scale-105 duration-200'>pdf دانلود</button>
                        <button className='bg-orange-300 rounded-xl font-semibold px-5 text-xl shadow-2xl border-[3px] border-orange-100  hover:scale-105 duration-200'>wordدانلود </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
