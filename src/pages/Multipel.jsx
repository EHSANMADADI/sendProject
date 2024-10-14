import React, { useState, useEffect, useRef } from 'react';
import Modal from '../componenet/Modal';
import img from '../images/img.png'
import InputMultiple from '../componenet/InputMultiple';
import Swal from 'sweetalert2';
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useStore from '../Store/store.ts';
import { FaCheckCircle } from "react-icons/fa"
import UploadMultipleFiles from '../componenet/UploadMultipleFiles.jsx';
import { FaDownload } from "react-icons/fa6";
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { SiMicrosoftexcel } from "react-icons/si";
import JSZip from 'jszip';
import axios from 'axios';


export default function Multipel() {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [openModals, setOpenModals] = useState([]);
    const [saveItems, setSaveItems] = useState([]);
    const [allFilesUploaded, setAllFilesUploaded] = useState(false);
    console.log("multiple files", files);
    const hasSaved = useRef(false);




    useEffect(() => {
        if (allFilesUploaded && !hasSaved.current) {
            try {
                localStorage.setItem('multiSeavedItems', JSON.stringify(saveItems));
                console.log('Items saved successfully');
                hasSaved.current = true;
                window.location.reload();
            } catch (err) {
                console.error('Error saving items:', err);
            }
        }
    }, [allFilesUploaded, saveItems]);

    useEffect(() => {
        function getSavedItems() {
            try {
                const storedItems = JSON.parse(localStorage.getItem('multiSeavedItems'));
                setSaveItems(storedItems || []);
            } catch (err) {
                console.error('Error retrieving items:', err);
            }
        }
        getSavedItems();
    }, []);



    const { setShowBTN, ChangeIndexMultiple } = useStore();



    const handelremove = (id) => {
        const updatedItems = saveItems.filter((_, i) => i !== id);
        setSaveItems(updatedItems);

        // به‌روزرسانی مقادیر در localStorage
        try {
            localStorage.setItem('multiSeavedItems', JSON.stringify(updatedItems));
            Swal.fire({
                title: "فایل با موفقیت حذف شد",
                icon: "success"
            });
        } catch (error) {
            console.error("Error updating localStorage: ", error);
        }
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


    const handelDownloadExcell = async (index) => {
        try {
            const zip = new JSZip(); // ایجاد یک فایل ZIP

            for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
               
                const item = saveItems[index][itemIndex];
                const url_document = item.url_document;

                let isProcessing = true;
                let excelBlob = null;

                while (isProcessing) {
                    // ارسال درخواست به API برای دانلود فایل اکسل
                    const response = await axios.post('http://195.191.45.56:17010/download_excel', { document_url: url_document }, { responseType: 'blob' });

                    if (response.data.state === "processing") {
                        console.log(response.data.state);

                        // اگر همچنان در حالت پردازش بود، کمی صبر کنید و مجدداً درخواست را ارسال کنید
                        await new Promise(resolve => setTimeout(resolve, 3000));
                    } else {
                        // فایل اکسل دریافت شد
                        console.log('excel file received');

                        excelBlob = response.data;
                        isProcessing = false;
                    }
                }

                if (excelBlob) {
                    // اضافه کردن فایل اکسل به فایل ZIP
                    zip.file(`file_${itemIndex + 1}.xlsx`, excelBlob);
                }
            }

            // ایجاد فایل ZIP و دانلود آن
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "excel_files.zip");
        }
        catch (error) {
            console.error("Error downloading Excel files:", error);
            Swal.fire({
                title: "خطا در دانلود فایل اکسل",
                icon: "error",
                text: "لطفاً دوباره تلاش کنید."
            });
        }
    }


    const handelDownloadWord = (index) => {
        var combinedResponseText = ''; // متغیر برای ذخیره تمام responseText ها
        saveItems[index].forEach((item) => {
            if (item.responseText) {
                combinedResponseText += item.responseText;
            } else {
                console.warn("responseText is missing for an item at index:", index);
            }
        });

        if (!combinedResponseText) {
            console.error("No valid responseText found for index:", index);
            return;
        }

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(combinedResponseText),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "Report.docx");
        }).catch(error => {
            console.error("Error while creating or saving the document:", error);
        });
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
                        files && <UploadMultipleFiles allFilesUploaded={allFilesUploaded} setAllFilesUploaded={setAllFilesUploaded} keys={files.length} files={files} setFiles={setFiles} setSaveItems={setSaveItems} saveItems={saveItems} />
                    }

                    {
                        saveItems.length > 0 && saveItems.map((itemArray, index) => (
                            <div key={index} className='box-Item seavItem border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
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
                                    <div className='flex'>
                                        <div className='flex justify-between w-full'>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => handelremove(index)}><span className='text-center  mr-2 text-2xl text-red-600 '><RiDeleteBin6Line /></span>حذف </button>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => { setShowBTN(true); handleModalOpen(index, itemArray.txt); ChangeIndexMultiple(index) }}><span className='text-center  mr-2 text-2xl text-blue-600 '><IoMdEye /></span>نمایش </button>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => handelDownloadWord(index)}><span className='text-center  mr-2 text-LG text-green-600 '><FaDownload /></span> WORD دانلود</button>
                                            <button className='border-dotted border-black rounded-md border-2 px-4 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => handelDownloadExcell(index)}><span className='text-center  mr-2 text-LG text-green-600 '><SiMicrosoftexcel /></span> EXCEL دانلود</button>

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
                                            <div key={i} className="flex md:flex-row flex-col h-full">
                                                <div dir='rtl' className="md:w-1/2 w-full overflow-x-auto max-h-[80vh] p-2">
                                                    <div className={`grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-${Math.ceil(itemArray.length - 1 / 2)}`}>
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

                                                <div dir="rtl" className="md:w-1/2 w-full md:p-4 p-2 bg-gray-50 overflow-auto max-h-[80vh]">
                                                    <p className="text-2xl font-black leading-8">
                                                        {itemArray.map((detail, index) => (
                                                            <div key={index} className="border-b-[3px] border-dashed pb-2">
                                                                <span className='md:text-base text-xs'>{detail.responseText.split('\u200B').join(' ')}</span>
                                                                <div className="text-left text-sm text-gray-600 mt-1">
                                                                    {`شماره: ${index + 1}`}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </p>
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
