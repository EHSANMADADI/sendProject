import React, { useState } from 'react'
import LeftNavUser from './LeftNavUser'
import ExtractInfoForm from './ExtractInfoForm'
import { RiMenu2Fill } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";

export default function UserFerstPage() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <div className='flex w-full justify-between p-5 h-screen overflow-hidden relative'>
            <div className={`fixed top-0 left-0 h-screen bg-white z-10 transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} w-full  sm:w-1/5`}>
                <LeftNavUser />
            </div>
            <div className='w-1/5 sm:flex hidden items-center '>
                <LeftNavUser />
            </div>
            <div className='sm:hidden flex w-full text-orange-500 cursor-pointer z-50 hover:text-orange-700 p-2' onClick={() => setIsNavOpen(!isNavOpen)}>
                {/* ///add change Icon WHEN NAV IS OPEN////////////////// */}
                {
                    isNavOpen && <span className='text-2xl text-orange-600'><MdArrowBack /></span>
                }
                {
                    !isNavOpen && <span><RiMenu2Fill size={24}/></span>
                }
            </div>
            <div className={`sm:w-3/5 mx-auto ${isNavOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`} >
                <ExtractInfoForm />

            </div>

        </div>
    )
}
