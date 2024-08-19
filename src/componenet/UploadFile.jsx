import React, { useEffect } from 'react'
import { FaCheckCircle } from "react-icons/fa";
// import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from 'react';
import Swal from 'sweetalert2'
import { IoMdEye } from "react-icons/io";
import axios from 'axios';

export default function UploadFile({ file, setFile, setSaveItem, saveItem }) {
    const [progress, setProgress] = useState(0);
    const [send, setSend] = useState(false)
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [reseveDta, setReseveDta] = useState(false);
    const [openModals, setOpenModals] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
 
    const formData = new FormData();
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        }
        reader.readAsDataURL(file);
    }
    useEffect(() => {
        setReseveDta(false)
        if (file) {
            var src;
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                src = e.target.result
            }
            reader.readAsDataURL(file);
            setProgress(0)
            setSend(false);
            ///////////////////////////////////////////////////////////////////JTD API   
            // formData.append('image', file)
            // axios.post('https://195.191.45.56:8734/ocr', formData, {
            //     onUploadProgress: (progressEvent) => {
            //         const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            //         setProgress(percentage);
            //     },
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     },

            // }).then((res) => {
            //     console.log(res);
            //     setReseveDta(true)
            //     setSend(true);
            //     setText(res.data.text);
            //     setOpen(true);
            //     const newItem = { name: file.name, img: src, txt: res.data.text };
            //     const storedArray = JSON.parse(sessionStorage.getItem('SeavedItem')) || [];
            //     const updatedArray = [...storedArray, newItem]
            //     setSaveItem(updatedArray);
            //     sessionStorage.setItem('SeavedItem', JSON.stringify(updatedArray));
            //     setOpenModals(new Array(updatedArray.length).fill(false));

            // })
            //     .catch((err) => {
            //         alert(`فایل ${file.name} ارسال نشد`);
            //         console.log(err);
            //     })

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            formData.append('image', file);//////Alephba API
            axios.post('http://195.191.45.56:17010/process_image', formData,
                {
                  
                    onUploadProgress: (progressEvent) => {
                        const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentage);
                    },
                })
                .then((res) => {
                    console.log(res.data.pages[0].text);
                    setReseveDta(true);
                    setSend(true);
                    setText(res.data.pages[0].text);
                    localStorage.setItem('txt', res.data.pages[0].text);
                    setOpen(true);
                    const newItem = { name: file.name, img: src, txt: res.data.pages[0].text };
                    const storedArray = JSON.parse(sessionStorage.getItem('SeavedItem')) || [];
                    const updatedArray = [newItem, ...storedArray];
                    setSaveItem(updatedArray);
                    sessionStorage.setItem('SeavedItem', JSON.stringify(updatedArray));
                    setOpenModals(new Array(updatedArray.length).fill(false));
                })
                .catch((err) => {
                    alert(`فایل ${file.name} ارسال نشد`);
                    console.log(err);
                });

        }

    }, [file])
    const handelremove = (id) => {
        // setFile(null)
        const updatedItems = saveItem.filter((_, i) => i !== id);
        setSaveItem(updatedItems)
        sessionStorage.setItem('SeavedItem', JSON.stringify(updatedItems));
        Swal.fire({
            title: "فایل با موفقیت حذف شد",
            icon: "success"
        });

    }
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
        <div>
            {
                saveItem.length === 0 && send && <div className='flex text-center justify-center text-gray-500 text-2xl font-bold mt-10'>
                    <p className='text-center'> فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
                </div>
            }






            {
                file && !reseveDta &&
                <div className='w-full'>
                    <div className='border border-gray-100 shadow-2xl rounded-lg  xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
                        <div className='flex justify-between items-center md:mx-5 mx-2'>
                            <p className='text-xl font-semibold'>{file.name}</p>
                            {
                                progress === 100 && send && <div className='text-lg text-green-500'>
                                    <FaCheckCircle />
                                </div>
                            }
                            {
                                progress != 100 && !send && <div className='text-3xl text-red-500 font-bold cursor-pointer hover:scale-110 duration-200 ' onClick={() => handelremove()}>
                                    <CiCircleRemove />
                                </div>
                            }
                        </div>
                        <div className='mx-6 mt-1'>
                            <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
                                <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="flex justify-end mb-1">
                                <span className="text-sm font-medium text-gray-400 dark:text-white">{progress}%</span>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs  font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => alert('لطفا صبر کنید تا پردازش تکمیل شود')}><span className='text-center mt-2 mr-2 text-2xl '><IoMdEye /></span>نمایش </button>
                                    <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs  font-semibold text-center flex items-center  hover:scale-105 duration-200' onClick={() => handelremove()}><span className='text-center mt-2 mr-2 text-2xl text-red-600 ' onClick={handelremove}><RiDeleteBin6Line /></span>حذف </button>
                                </div>
                                {/* <div className='flex'>
                                    <button className='bg-orange-300 rounded-xl font-semibold sm:text-xl text-xs  shadow-2xl border-[3px] border-orange-100 sm:px-5 px-2  hover:scale-105 duration-200'>pdf دانلود</button>
                                    <button className='bg-orange-300 rounded-xl font-semibold sm:px-5 px-3  sm:text-xl text-xs  shadow-2xl border-[3px] border-orange-100  hover:scale-105 duration-200'>wordدانلود </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {
                        !send && <div className='flex justify-center'><span className='text-center text-black sm:text-2xl text-base'>...لطفا صبور باشید</span></div>
                    }
                </div>
            }

        </div>


    )
}
