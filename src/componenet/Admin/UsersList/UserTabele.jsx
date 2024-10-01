import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function UserTabele() {
    return (
        <div>
            <div dir='rtl' id='Tabel' className='w-full'>
                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-base text-gray-700 uppercase bg-orange-400 text-center">
                            <tr>
                                <th scope="col" className="p-4 py-3 border border-gray-300">
                                    انتخاب
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    شماره
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    نام و نام خانوادگی
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    نام کاربری
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    رمز عبور
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    ویرایش
                                </th>
                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                    حذف
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b text-center hover:bg-gray-50">
                                <td className="w-4 p-4 border border-gray-300">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 rounded-2xl" />
                                        <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-300">
                                    1
                                </th>
                                <td className="px-6 py-4 border border-gray-300">
                                    احسان مددی
                                </td>
                                <td className="px-6 py-4 border border-gray-300">
                                    hpshk
                                </td>
                                <td className="px-6 py-4 border border-gray-300">
                                    ohikl;
                                </td>
                                <td className="px-6 py-4 text-orange-400 text-lg flex border border-gray-300">
                                    <span className='px-auto mx-auto'>
                                        <FaEdit />
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-red-600 text-lg border border-gray-300">
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
