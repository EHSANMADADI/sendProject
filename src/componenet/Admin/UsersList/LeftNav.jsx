import React, { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';


export default function LeftNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeList, setActiveList] = useState(false);
  const [activeAddUser, setActiveAddUser] = useState(false);

  // UseEffect to check the route and update the state
  useEffect(() => {
    if (location.pathname === '/Admin/ListUser') {
      setActiveList(true);
      setActiveAddUser(false);
    } else if (location.pathname === '/Admin/AddUser') {
      setActiveAddUser(true);
      setActiveList(false);
    }
  }, [location]);

  return (
    <div className='border-orange-300 h-full w-8/12 mx-auto border-2 rounded-md shadow-inner flex flex-col justify-between'>
      <div className='flex flex-col justify-around'>
        <div className={'flex flex-col items-center justify-center mb-10 pt-5 ' + (activeList ? 'bg-orange-200' : '')}>
          <span className='text-orange-400 md:text-5xl text-3xl cursor-pointer' onClick={() => {
            navigate('/Admin/ListUser');
          }}>
            <FaUsers />
          </span>
          <span className='md:text-xl text-base font-bold cursor-pointer' onClick={() => {
            navigate('/Admin/ListUser');
          }}>
            لیست کاربران
          </span>
        </div>
        <div className={'flex flex-col items-center justify-center rounded pt-5 ' + (activeAddUser ? 'bg-orange-200' : '')}>
          <span className='text-orange-400 md:text-5xl text-3xl cursor-pointer' onClick={() => {
            navigate('/Admin/AddUser');
          }}>
            <MdGroupAdd />
          </span>
          <span className='md:text-xl text-base font-bold cursor-pointer' onClick={() => {
            navigate('/Admin/AddUser');
          }}>
            ایجاد کاربر
          </span>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <span>
          <FaChevronDown />
        </span>
        <span className='md:text-xl text-base font-bold'>ادمین</span>
        <span className='text-orange-400 md:text-4xl text-2xl m-2 mb'>
          <IoPersonCircle />
        </span>
      </div>
    </div>
  );
}
