import React from 'react'
import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Input() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const MAX_FILE_SIZE = 10485760; // 10MB
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'image/jpeg') {
                if (selectedFile.size <= MAX_FILE_SIZE) {
                    setFile(selectedFile);
                    setError('');
                } else {
                    setFile(null);
                    setError('File size must be less than 1MB');
                }
            } else {
                setFile(null);
                setError('Only JPG files are allowed');
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            // handle file upload logic here
            console.log('File ready to upload:', file);
        }
    };
    const handleButtonClick = () => {
        document.getElementById('dropzone-file').click();
    };
    return (
        <div className="md:w-1/2 w-full mx-auto max-h-screen flex justify-center">
            <div className="flex items-center justify-center w-full flex-col">
                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col border-2 border-gray-300 border-dashed h-screen my-20 justify-center rounded-lg'>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full  cursor-pointe">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 mt-5">
                           <span className='text-8xl mb-4 text-blue-400'><FaCloudUploadAlt/></span>
                           <p className='text-2xl font-bold'>فایل های خود را انتخاب کنید</p>
                           <p className='text-2xl font-bold mt-10 mb-5'>یا </p>
                        </div>
                        <button onClick={handleButtonClick} className='px-6 py-2 bg-orange-400 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-orange-200'>انتخاب فایل ها</button>
                        <input id="dropzone-file" type="file" accept='.jpg,.jpeg,.png ' className="hidden" onChange={(e) => handleFileChange(e)} />
                    </label>
                </form>

            </div>
        </div>
    )
}
