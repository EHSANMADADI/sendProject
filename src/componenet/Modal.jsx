import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import useStore from '../Store/store.ts';
export default function Modal({ Open, onClose, children }) {

  const { showBTN } = useStore();
  if (!Open) return null;


  const Handelclose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <div className='md:fixed  inset-0   flex justify-center items-center transition-colors bg-opacity-25 z-50  border-black' id='wrapper' onClick={Handelclose}>
      <div className='w-full sm:w-5/6 flex flex-col sm:mx-0 mx-auto'>
        <button className='text-gray-400  place-self-end rounded p-2 mb-1' onClick={() => onClose()}><IoIosCloseCircle className='text-3xl bg-white' /></button>
        <div className='bg-gray-100 rounded p-5 '>
          <div className='w-full'>
            {children}
          </div>
          {
            showBTN && <div className='flex justify-around mt-5'>
              <Link to={'/Multipel/extract'} className='px-5 py-2 bg-orange-400 rounded-md  text-white font-semibold hover:scale-75 duration-300'>استخراج موجودیت ها
              </Link>
              {/* <Link to={'semantic'}

                className='px-5 py-2 bg-yellow-500 rounded-md mx-5 text-white font-semibold hover:scale-75 duration-300'> بهبود معنایی
              </Link> */}
              <Link to={'/Multipel/spelling'} className='px-5 py-2 bg-amber-600 rounded-md  text-white font-semibold hover:scale-75 duration-300'> بهبود متن
              </Link>

            </div>
          }
        </div>
      </div>
    </div>
  )
}