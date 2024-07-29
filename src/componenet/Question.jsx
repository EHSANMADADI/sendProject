import React from 'react';
import useStore from '../Store/store.ts';
import { FiSend } from "react-icons/fi";
export default function Question() {
  const { showQuestion, setShowQuestion, setShowBTN } = useStore();


  return (
    <>
      <div className='flex items-center'>
        <input className='rounded-2xl w-3/4 px-4 py-2 focus:border-orange-500 border-none outline-none ' placeholder='پرسش خود را وارد نمایید' />
        <button className='bg-amber-600 px-4 py-2  rounded-2xl mx-4  border-amber-200 border-4 shadow-2xl'>
          <span className='text-lg font-semibold px-3'>
            ارسال
          </span>
          <span className="transform -rotate-90 inline-block text-xl mt-1">
            <FiSend />
          </span>


        </button>
      </div>

    </>
  );
}
