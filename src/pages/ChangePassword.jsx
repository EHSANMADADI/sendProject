
import React, { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    return (
        <div className='w-full  h-screen' dir='rtl'>
            <div className="overflow-visible ">
                <div className=' w-full overflow-visible   absolute '>
                    <div className='clippathChangePasssword absolute'></div>
                    <dive className='flex items-center cursor-pointer justify-end p-5 text-3xl z-50 text-white relative w-full'>
                        <span onClick={() => navigate('/')}>
                            <FaArrowLeftLong />
                        </span>

                    </dive>
                    <div className='w-full flex items-center justify-center overflow-visible  z-50'>
                        <div className='bg-white z-50  p-10 rounded-xl text-center lg:w-1/4 sm:w-1/2 w-full  shadow-2xl shadow-black relative top-1/2 overflow-visible'>
                            <h1 className='text-2xl font-black my-4'>تغییر رمز عبور</h1>
                            <h6 className='text-gray-500 font-semibold text-base'>سیستم آنلاین تبدیل متن به عکس (ocr)</h6>
                            <form className="flex flex-col items-center w-full my-5">
                                <div className=" w-4/5  mx-auto py-3 px-5 flex items-center border rounded border-gray-200">
                                    <span className="text-gray-400 text-2xl m-1">
                                        <IoPersonSharp />
                                    </span>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-none w-full m-1 outline-none" placeholder="نام کاربری" /></div>
                                <div className=" w-4/5 mx-auto py-3 px-5 flex items-center border rounded border-gray-200 my-5">
                                    <span className="text-gray-300 text-2xl m-1">
                                        <HiOutlineLockClosed />
                                    </span>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="border-none m-1 w-full outline-none" placeholder="رمز عبور فعلی" />
                                    <span onClick={() => setShowPassword(!showPassword)} className="text-gray-500  border-blue-300 border-dashed rounded-full z-50">
                                        {showPassword ? <FiEye /> : <FaRegEyeSlash />}

                                    </span>
                                </div>

                                <div className=" w-4/5 mx-auto py-3 px-5 flex items-center border rounded border-gray-200 mb-5">
                                    <span className="text-gray-300 text-2xl m-1">
                                        <HiOutlineLockClosed />
                                    </span>
                                    <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-none m-1 w-full outline-none" placeholder="رمز عبور جدید" />
                                    <span onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-500  border-blue-300 border-dashed rounded-full z-50">
                                        {showNewPassword ? <FiEye /> : <FaRegEyeSlash />}

                                    </span>
                                </div>
                                <button className="rounded py-3 px-5 bg-orange-400 text-white text-2xl w-4/5 mx-auto hover:bg-orange-300 mb-3">ثبت</button>

                            </form>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}
