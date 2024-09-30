import React from 'react'

export default function Search() {
    return (
        <div className='flex justify-between '>
            <div>
                <h2 className='text-3xl font-black'>لیست کاربران</h2>
            </div>
            <div className='flex justify-center items-center'>

                <button className='mx-3 my-5 px-6 font-semibold py-2 rounded-md border-none bg-orange-400 hover:bg-orange-600 duration-300'>ثبت</button>
                <input dir='rtl' className='outline-none py-2 px-5 mx-2 border border-gray-300 my-5 rounded-md  shadow-inner' placeholder='جست و جو کاربران' />
            </div>
        </div>
    )
}
