import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
export default function UserTabele() {
    return (
        <div>
         
            <div dir='rtl' id='Tabel' className='w-full'>
                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 ">
                        <thead className="text-base text-gray-700 uppercase bg-orange-400 text-center ">
                            <tr>
                                <th scope="col" className="p-4 py-3">
                                    انتخاب
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    شماره
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    نام و نام خانوادگی
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    نام کاربری
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    رمز عبور
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ویرایش
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حذف
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="bg-white border-b text-center  hover:bg-gray-50 ">
                                <td class="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-2 " type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500  focus:ring-2 rounded-2xl " />
                                        <label for="checkbox-table-2" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" clasName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    1
                                </th>
                                <td className="px-6 py-4">
                                    احسان مددی
                                </td>
                                <td className="px-6 py-4">
                                    hpshk
                                </td>
                                <td className="px-6 py-4">
                                    ohikl;
                                </td>
                                <td className="px-6 py-4 text-orange-400 text-lg flex ">
                                    <span className='px-auto mx-auto '>
                                        <FaEdit />
                                    </span>

                                </td>
                                <td className="px-6 py-4 text-red-600 text-lg">
                                    <span className='items-center text-center flex justify-center'>
                                        <MdDelete />
                                    </span>




                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
