import { useState } from 'react';
import './App.css';
import Input from './componenet/Input';
import img from './images/img.png'
import UploadFile from './componenet/UploadFile';

function App() {
  return (
    <div className='flex overflow-hidden lg:flex-nowrap flex-wrap'>
      <Input />
      <div>
        <div>
          <img className='md:w-1/2 w-0 mx-auto ' src={img} alt='img-banner' />
        </div>
        <div className='scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 h-1/3 overflow-y-scroll'>
        <UploadFile />
        <UploadFile />
        <UploadFile />
        <UploadFile />
        <UploadFile />
        </div>
      </div>
    </div>
  );
}

export default App;
