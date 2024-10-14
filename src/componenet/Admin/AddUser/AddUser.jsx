import React, { useState } from 'react';
import FormAdd from './FormAdd';
import UserTabele from '../UsersList/UserTabele';
import LeftNav from '../UsersList/LeftNav';
import { RiMenu2Fill } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";

export default function AddUser() {
    const [isNavOpen, setIsNavOpen] = useState(false); // مدیریت نمایش LeftNav

    return (
        <div className='flex w-full justify-between p-5 h-screen overflow-hidden relative'>
            {/* LeftNav with animation */}
            <div className={`fixed top-0 left-0 h-screen bg-white z-10 transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} w-full  sm:w-1/5`}>
                <LeftNav />
            </div>
            <div className='w-1/5 sm:flex hidden items-center '>
                <LeftNav />
            </div>

            {/* Menu Icon (Always visible) */}
            <div className='sm:hidden flex w-full text-orange-500 cursor-pointer z-50 hover:text-orange-700 p-2' onClick={() => setIsNavOpen(!isNavOpen)}>
                {/* ///add change Icon WHEN NAV IS OPEN////////////////// */}
                {
                    isNavOpen && <span className='text-2xl text-orange-600'><MdArrowBack /></span>
                }
                {
                    !isNavOpen && <span><RiMenu2Fill size={24} /></span>
                }
            </div>

            {/* Main Content */}
            <div className={`sm:w-4/5 pr-10  mx-auto w-full ${isNavOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`} >
                <FormAdd />
                <UserTabele />
            </div>
        </div>
    );
}
