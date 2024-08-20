import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleRemove } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function UploadMultipleFiles({ keys, files, setSaveItems, saveItems, setFiles }) {
  const [reseveDta, setReseveDta] = useState(false);
  const [progressAll, setProgressAll] = useState(0);
  const [fileStates, setFileStates] = useState(files.map(file => ({
    file,
    // responseText: '',
    src: '',
  })));
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);///اینو باید ببرم تو فایل مولتیپل و از طریق پراپز بفرستم اینجا
  const [selectedImage, setSelectedImage] = useState();
  const handleUpload = (fileState, index) => {
    const formData = new FormData();
    formData.append('image', fileState.file);

    //////create src for read image
    // var src;
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   setSelectedImage(e.target.result);
    //   src = e.target.result
    // }
    // reader.readAsDataURL(fileState.file);
    /////////////////////

    const imageUrls = URL.createObjectURL(fileState.file);





    axios.post('http://195.191.45.56:17010/process_image', formData, {
      onUploadProgress: (progressEvent) => {
        const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        setFileStates(prevStates => {
          const updatedStates = [...prevStates];
          updatedStates[index].progress = percentage;
          return updatedStates;
        });
      }
    })
      .then(res => {
        console.log(res.data.pages[0].text);
        setReseveDta(true);

        setFileStates(prevStates => {
          const updatedStates = [...prevStates];
          updatedStates[index].isSent = true;
          // updatedStates[index].responseText = res.data.pages[0].text;
          updatedStates[index].src = imageUrls;
          setProgressAll(100 / fileStates.length - index)
          // Check if all files have been uploaded
          const allSent = updatedStates.every(state => state.isSent);

          if (allSent) {
            setAllFilesUploaded(true);
            const newItem = JSON.stringify(fileStates)
            const storedArray = JSON.parse(sessionStorage.getItem('multiSeavedItems')) || [];
            const updatedArray = [newItem, ...storedArray];
            setSaveItems([updatedArray]);
          }
          return updatedStates;
        });
        console.log(allFilesUploaded);

      })
      .catch(err => {
        alert(`فایل ${fileState.file.name} ارسال نشد`);
        console.log(err);
      });
  };
  useEffect(() => {
    if (files) {
      setFileStates(files.map(file => ({
        file,
        src: '',
      })));
    }
  }, [files]);

  useEffect(() => {
    setReseveDta(false);
    fileStates.forEach((fileState, index) => {
      if (!fileState.isSent) {
        handleUpload(fileState, index);
      }
    });


  }, []);

  return (
    <div>
      {
        saveItems.length === 0 && <div className='flex text-center justify-center text-gray-500 text-2xl font-bold mt-10'>
          <p className='text-center'> فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
        </div>
      }

      {
        !allFilesUploaded && !reseveDta && <div className='w-full'>
          <div className='border border-gray-100 shadow-2xl rounded-lg  xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
            <div className='flex justify-between items-center md:mx-5 mx-2'>
              <p className='text-xl font-semibold overflow-clip'>درحال پردازش لطفا صبر کنید</p>
              {
                progressAll === 100 && <div className='text-lg text-green-500'>
                  <FaCheckCircle />
                </div>
              }
              {
                progressAll != 100 && <div className='text-3xl text-red-500 font-bold cursor-pointer hover:scale-110 duration-200 '>
                  <CiCircleRemove />
                </div>
              }
            </div>
            <div className='mx-6 mt-1'>
              <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
                <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${progressAll}%` }}></div>
              </div>
              <div className="flex justify-end mb-1">
                <span className="text-sm font-medium text-gray-400 dark:text-white">{progressAll}%</span>
              </div>
              <div className='flex justify-between'>
                <div className='flex'>
                  <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs  font-semibold text-center flex items-center hover:scale-105 duration-200' onClick={() => alert('لطفا صبر کنید تا پردازش تکمیل شود')}><span className='text-center mt-2 mr-2 text-2xl '><IoMdEye /></span>نمایش </button>
                  <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs  font-semibold text-center flex items-center  hover:scale-105 duration-200' onClick={() => console.log("a")}><span className='text-center mt-2 mr-2 text-2xl text-red-600 '><RiDeleteBin6Line /></span>حذف </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      }

    </div>
  );
}
