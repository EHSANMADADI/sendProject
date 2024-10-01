import React, { useState, useEffect } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import { LuClipboardCheck } from "react-icons/lu";
import { MdLibraryAdd } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export default function LeftNavUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeInfo, setActiveInfo] = useState(false);
  const [activeExtendedFile, setActiveExtendedFile] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  useEffect(() => {
    if (location.pathname === '/UserPage/ExtractInfoFile') {
      setActiveInfo(true);
      setActiveExtendedFile(false);
    } else if (location.pathname === '/UserPage/ExtendedFile') {
      setActiveExtendedFile(true);
      setActiveInfo(false);
    }
  }, [location]);

  return (
    <div className='border-orange-300 h-full w-8/12 mx-auto border-2 rounded-md shadow-inner flex flex-col justify-between'>
      <div className='flex flex-col justify-around'>
        <div className={'flex flex-col items-center justify-center mb-10 pt-5 ' + (activeInfo ? 'bg-orange-200' : '')}>
          <span className='text-orange-400 md:text-5xl text-3xl cursor-pointer mb-2' onClick={() => {
            navigate('/UserPage/ExtractInfoFile');
          }}>
            <TfiWrite />
          </span>
          <span className='md:text-xl text-center text-base font-bold cursor-pointer' onClick={() => {
            navigate('/UserPage/ExtractInfoFile');
          }}>
            اطلاعات استخراج شده از فرم
          </span>
        </div>
        <div className={'flex flex-col items-center justify-center rounded pt-5 ' + (activeExtendedFile ? 'bg-orange-200' : '')}>
          <span className='text-orange-400 md:text-5xl text-3xl cursor-pointer' onClick={() => {
            navigate('/UserPage/ExtendedFile');
          }}>
            <LuClipboardCheck />
          </span>
          <span className='md:text-xl text-base text-center font-bold cursor-pointer' onClick={() => {
            navigate('/UserPage/ExtendedFile');
          }}>
            فایل های موجود
          </span>
        </div>
      </div>
      <div>
        <div className='flex flex-col justify-center items-center mb-4 cursor-pointer' onClick={()=>{
          navigate('/Multipel')
        }}>
          <div>
            <span className='text-orange-400 md:text-5xl text-2xl'>
              <MdLibraryAdd />
            </span>
          </div>
          <span className='md:text-xl text-base text-center font-black'>
            شروع پروژه
          </span>
        </div>
        <div className='flex items-center justify-center '>
          {showLogOut ? (
            <div onClick={() => {
              navigate('/')
            }} className='flex items-center bg-neutral-100 p-2 rounded cursor-pointer hover:scale-110 duration-200 mr-1'>
              <span className='text-red-700 font-extrabold text-2xl mx-1'><CiLogout /></span>
              <span>خروج</span>


            </div>
          ) : (null)}
          <div className='flex items-center cursor-pointer' onClick={()=>{
            setShowLogOut(!showLogOut)
          }}>
            <span>
              <FaChevronDown />
            </span>
            <span className='md:text-xl text-base font-bold'> نام فرد</span>
            <span className='text-orange-400 md:text-4xl text-2xl m-2 mb'>
              <IoPersonCircle />
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
