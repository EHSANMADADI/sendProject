import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import Modal from '../componenet/Modal';
import img from '../images/img.png'
import InputMultiple from '../componenet/InputMultiple';
import Swal from 'sweetalert2';
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useStore from '../Store/store.ts';
import { FaCheckCircle } from "react-icons/fa"
import UploadMultipleFiles from '../componenet/UploadMultipleFiles.jsx';

export default function Multipel() {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [openModals, setOpenModals] = useState([]);
    const [saveItems, setSaveItems] = useState([]);

    useEffect(() => {
        async function getSavedItems() {
            const storedItems = await localforage.getItem('multiSeavedItems');
            setSaveItems(JSON.parse(storedItems) || []);
        }
        getSavedItems();
    }, []);

    const { setShowBTN } = useStore();

    useEffect(() => {
        if (saveItems.length > 0) {
            localforage.setItem('multiSeavedItems', JSON.stringify(saveItems));
        }
    }, [saveItems]);

    const handelremove = (id) => {
        const updatedItems = saveItems.filter((_, i) => i !== id);
        setSaveItems(updatedItems);
    
        // به‌روزرسانی مقادیر در localforage
        localforage.setItem('multiSeavedItems', JSON.stringify(updatedItems)).then(() => {
            Swal.fire({
                title: "فایل با موفقیت حذف شد",
                icon: "success"
            });
        }).catch((error) => {
            console.error("Error updating localforage: ", error);
        });
    };
    

    const handleModalOpen = (index, txt) => {
        localStorage.setItem('txt', txt)
        const updatedOpenModals = [...openModals];
        updatedOpenModals[index] = true;
        setOpenModals(updatedOpenModals);
    };

    const handleModalClose = (index) => {
        const updatedOpenModals = [...openModals];
        updatedOpenModals[index] = false;
        setOpenModals(updatedOpenModals);
    };

    return (
        <div className='flex lg:overflow-hidden lg:flex-nowrap flex-wrap lg:h-screen '>
            <div className='w-2/3 mx-auto'>
                <InputMultiple files={files} setFiles={setFiles} error={error} setError={setError} />
            </div>
            <div className='h-screen lg:w-1/2 w-full mx-auto sm:mr-20'>
                <div>
                    <img className='md:w-1/2 w-0 mx-auto ' src={img} alt='img-banner' />
                </div>
                <div className='w-full md:h-1/2 h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 '>
                    {
                        !files && saveItems.length === 0 && <div className='flex justify-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center'>
                            <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
                        </div>
                    }
                    {
                        files && <UploadMultipleFiles files={files} setFiles={setFiles} setSaveItems={setSaveItems} saveItems={saveItems} />
                    }

                    {
                        saveItems.length > 0 && saveItems.map((itemArray, index) => (
                            <div key={index} className='seavItem border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
                                <div className='flex justify-between items-center md:mx-5 mx-2'>
                                    <p className='text-xl font-semibold'>پردازش تکمیل شد</p>
                                    <div className='text-lg text-green-500'>
                                        <FaCheckCircle />
                                    </div>
                                </div>
                                <div className='sm:mx-6 mx-0 mt-1'>
                                    <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
                                        <div className="bg-orange-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="flex justify-end mb-1">
                                        <span className="text-sm font-medium text-gray-400 dark:text-white">100%</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => { setShowBTN(true); handleModalOpen(index, itemArray.txt) }}><span className='text-center mt-2 mr-2 text-2xl '><IoMdEye /></span>نمایش </button>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => handelremove(index)}><span className='text-center mt-2 mr-2 text-2xl text-red-600 '><RiDeleteBin6Line /></span>حذف </button>
                                        </div>
                                    </div>
                                </div>

                                {
                                    itemArray.map((file, i) => (
                                        <Modal
                                            key={i}
                                            Open={openModals[index]}
                                            onClose={() => handleModalClose(index)}
                                        >
                                            <div key={i} className="flex h-full">
                                                <div dir='rtl' className="w-1/2 overflow-x-auto max-h-[80vh] p-2">
                                                    <div className={`grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${Math.ceil(itemArray.length / 2)}`}>
                                                        {itemArray.map((detail, index) => (
                                                            <div key={index} className="relative">
                                                                <img
                                                                    className="w-full h-auto  object-cover rounded-lg"
                                                                    src={detail.src}
                                                                    alt={`detail-${index}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div dir="rtl" className="w-1/2 p-4 bg-gray-50 overflow-auto max-h-[80vh]">
                                                    <pre className="text-sm font-black">
                                                        {itemArray.map((detail, index) => (
                                                            <div key={index} className="border-b-[3px] border-dashed pb-2">
                                                                {detail.responseText}
                                                                <div className="text-left text-sm text-gray-600 mt-1">
                                                                    {`شماره: ${index + 1}`}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </pre>
                                                </div>
                                            </div>
                                        </Modal>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
