import React, { useEffect } from 'react'
import Input from '../componenet/Input'
import { FaCheckCircle } from "react-icons/fa";
import Modal from '../componenet/Modal';
import img from '../images/img.png'
import { useState } from 'react';
import UploadFile from '../componenet/UploadFile';
import Swal from 'sweetalert2';
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function FerstPage() {
  const [file, setFile] = useState();
  const [error, setError] = useState('');
  const [openModals, setOpenModals] = useState([]);
  const [saveItem, setSaveItem] = useState([])
  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem('SeavedItem')) | null
    setSaveItem(storage)
    return (() => {
      sessionStorage.setItem('SeavedItem', JSON.stringify([]));
    })
  }, [])

  const handelremove = (id) => {
    // setFile(null)
    const updatedItems = saveItem.filter((_, i) => i !== id);
    // setSaveItem(updatedItems)
    sessionStorage.setItem('SeavedItem', JSON.stringify(updatedItems));
    Swal.fire({
      title: "فایل با موفقیت حذف شد",
      icon: "success"
    });

  }
  const handleModalOpen = (index) => {
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
      <div className='w-2/3  mx-auto'>
        <Input file={file} setFile={setFile} error={error} setError={setError} />
      </div>


      <div className='h-screen  lg:w-1/2 w-full mx-auto  sm:mr-20'>
        <div>
          <img className='md:w-1/2 w-0 mx-auto ' src={img} alt='img-banner' />
        </div>
        <div className='w-full md:h-1/2 h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 '>
          {
            !file && !saveItem && <div className='flex  justify-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center'>
              <p> فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
            </div>
          }

          {
            saveItem.length > 0 && saveItem.map((item, index) => (
              <div key={index} className='seavItem border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
                <div className='flex justify-between items-center md:mx-5 mx-2'>
                  <p className='text-xl font-semibold'>{item.name}</p>
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
                      <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => handleModalOpen(index)}><span className='text-center mt-2 mr-2 text-2xl '><IoMdEye /></span>نمایش </button>
                      <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center  hover:scale-105 duration-200' onClick={() => handelremove(index)}><span className='text-center mt-2 mr-2 text-2xl text-red-600 ' onClick={() => { handelremove() }}><RiDeleteBin6Line /></span>حذف </button>
                    </div>
                    <div className='flex'>
                      <button className='bg-orange-300 rounded-xl font-semibold sm:text-xl text-xs shadow-2xl border-[3px] border-orange-100 px-5  hover:scale-105 duration-200'>pdf دانلود</button>
                      <button className='bg-orange-300 rounded-xl font-semibold px-5 sm:text-xl text-xs shadow-2xl border-[3px] border-orange-100  hover:scale-105 duration-200'>wordدانلود </button>
                    </div>
                  </div>
                </div>
                <Modal Open={openModals[index]} onClose={() => handleModalClose(index)} txt={item.txt}>
                  <div>
                    <div className='flex'>
                      <div className='w-1/2'>
                        <img className='w-full max-h-[700px]' src={item.img} alt='selectedImg' />
                      </div>
                      <div dir='rtl' className='border w-1/2 leading-10 bg-gray-50 rounded-2xl'>
                        <h4 className='md:text-4xl text-xl   font-black text-blue-600 mb-5 mt-2 p-5'>متن تولید شده</h4>
                        <p className='p-5 md:text-2xl text-lg font-black'>{item.txt}</p>
                      </div>

                     
                    </div>
                  
                  </div>

                </Modal>
              </div>
            ))
          }

          {
            file !== 0 && <UploadFile file={file} setFile={setFile} />
          }
        </div>
      </div>
    </div>
  )
}
