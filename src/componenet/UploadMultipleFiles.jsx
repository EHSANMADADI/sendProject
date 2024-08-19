import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UploadMultipleFiles({ files, setSaveItems, saveItems }) {
  console.log(files);

  const [fileStates, setFileStates] = useState(files.map(file => ({
    file,
    progress: 0,
    isSent: false,
    responseText: '',
  })));
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);///اینو باید ببرم تو فایل مولتیپل و از طریق پراپز بفرستم اینجا
  const [selectedImage, setSelectedImage] = useState(null);
  const handleUpload = (fileState, index) => {
    const formData = new FormData();
    formData.append('image', fileState.file);

    //////create src for read image
    var src;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      src = e.target.result
    }
    reader.readAsDataURL(fileState.file);
    /////////////////////
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
        setFileStates(prevStates => {
          const updatedStates = [...prevStates];
          updatedStates[index].isSent = true;
          updatedStates[index].responseText = res.data.pages[0].text;
          // Check if all files have been uploaded
          const allSent = updatedStates.every(state => state.isSent);

          if (allSent) {
            setAllFilesUploaded(true);
            const newItem = [JSON.stringify(fileStates)]
            const storedArray = JSON.parse(sessionStorage.getItem('multiSeavedItems')) || [];
            const updatedArray = [newItem, ...storedArray];
            setSaveItems(updatedArray);
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
    fileStates.forEach((fileState, index) => {
      if (!fileState.isSent) {
        handleUpload(fileState, index);
      }
    });
  }, []);

  return (
    <div>
      {
        !allFilesUploaded && <div>
          لطفا شکیبا باشید درحال انجام عملیات هستیم
        </div>
      }
      {allFilesUploaded && fileStates.map((fileState, index) => (
        <div key={index}>
          <div className='file-info'>
            <p>{fileState.file.name}</p>
            <div className="progress-bar" style={{ width: `${fileState.progress}%` }}></div>
            <p>{fileState.progress}%</p>
            {fileState.isSent && <p>متن دریافت شده: {fileState.responseText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
