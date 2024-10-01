import React from 'react'
import { TiEye } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
export default function TabelInfo() {
    return (
        <div className='w-4/5 mx-auto border rounded-lg' dir='rtl'>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="md:px-6 px-2 py-3 text-start  md:text-lg text-base text-black font-extrabold  ">شماره</th>
                                        <th scope="col" className="md:px-6 px-2 py-3 text-start  md:text-lg text-base text-black font-extrabold  ">مشخصات فردی فرم</th>
                                        <th scope="col" className="md:px-6 px-2 py-3 text-start tmd:ext-lg  text-base text-black font-extrabold  ">نمایش</th>
                                        <th scope="col" className="md:px-6 px-2 py-3 text-start  md:text-lg text-base text-black font-extrabold  ">حذف</th>
                                        <th scope="col" className="md:px-6 px-2 py-3 text-start  md:text-lg text-base text-black font-extrabold  ">ذخیره</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                    <tr>
                                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">1</td>
                                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-sm text-gray-800 ">nan</td>
                                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-2xl text-orange-300 cursor-pointer hover:scale-110 duration-500   "><TiEye/></td>
                                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-2xl text-red-500  cursor-pointer hover:scale-110 duration-500 "><MdDelete /></td>
                                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-2xl text-orange-500 cursor-pointer hover:scale-110 duration-500  "><FaDownload/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
