import React from 'react'

export default function FormAdd() {
    return (
        <div className='flex justify-end items-center'>
            <button className='mx-3 my-5 px-6 font-semibold py-2 rounded-md border-none bg-orange-400 hover:bg-orange-600 duration-300'>ثبت</button>
            <input dir='rtl' className='outline-none py-2 px-5 mx-2 border border-gray-300 my-5 rounded-md  shadow-inner' placeholder='نام و نام خانوادگی' />
            <input dir='rtl' className='outline-none py-2 px-5 mx-2 border border-gray-300 my-5 rounded-md  shadow-inner' placeholder='نام کاربری' />
            <input dir='rtl' className='outline-none py-2 px-5 mx-2 border border-gray-300 my-5 rounded-md  shadow-inner' placeholder='رمز عبور' />
        </div>
    )
}
