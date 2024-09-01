import React, { useState, useRef } from 'react';
import useStore from '../Store/store.ts';
import { FiSend } from "react-icons/fi";
import CircleLoader from "react-spinners/CircleLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Question({setAnswer,fullText}) {
  const {selectedModel } = useStore();
  const txt = fullText;

  
  const [question, setQuestion] = useState('');
  const [Loading, setLoading] = useState(false);
  const controllerRef = useRef(null); // UseRef برای نگه‌داشتن AbortController
   

  const fetchLLMAya = async () => {
    console.log(Loading);
    setLoading(true);
    try {
      const res = await fetch('http://195.191.45.56:17010/upload_text', {/////Aya
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ text: txt }),
        signal: controllerRef.current.signal, // سیگنال برای قطع درخواست
      });
      const data = await res.json();
      console.log(data);
      questionAya();
    }
    catch (error) {
      setLoading(false);
      toast.error('مشکلی پیش آمده لطفا دوباره تلاش کنید', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
      });
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        toast.info('عملیات متوقف شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
      } else {
        console.error('Error fetching LLM Aya data:', error);
      }
    }
  }

  const fetchLLMDorna = async () => {
    console.log(Loading);
    setLoading(true);
    try {
      const res = await fetch('http://195.191.45.56:17010/upload_text_dorna', {/////dorna
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: txt }),
        signal: controllerRef.current.signal, // سیگنال برای قطع درخواست
      });
      const data = await res.json();
      console.log(data);
      questionDorna();
    }
    catch (error) {
      console.error('Error fetching LLM dorna data:', error);
      setLoading(false);
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        toast.info('عملیات متوقف شد', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        
          });
      } else {
        toast.error('مشکلی پیش آمده لطفا دوباره تلاش کنید', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
        });
      
      }
    }
  }

  const questionAya = async () => {
    console.log(question);
   
      try {
        const res = await fetch('http://195.191.45.56:17010/chat', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: question }),
          signal: controllerRef.current.signal, // سیگنال برای قطع درخواست
        });
        
        console.log(res);
        const data=await res.json()
        console.log(data.response);
        setAnswer(data.response);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          toast.info('عملیات متوقف شد', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          
            });
        } else {
          console.error('Error:', error);
        }
      } 
  }

  const questionDorna = async () => {
    console.log(question+'dorna');
      try {
        console.log(question);
        const res = await fetch('http://195.191.45.56:17010/chat_dorna', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: question }),
          signal: controllerRef.current.signal, // سیگنال برای قطع درخواست
        });
        console.log(res);
        const data=await res.json()
        console.log(data.response);
        setAnswer(data.response)
        setLoading(false);
      
      } catch (error) {
        setLoading(false);
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          toast.info('عملیات متوقف شد', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });
        } else {
          console.error('Error:', error);
        }
      }
  }

  const sendqiestion = async () => {
    setLoading(true);
    controllerRef.current = new AbortController(); // ایجاد یک AbortController جدید
    if (selectedModel === 'model2') {
      fetchLLMDorna();
    } else if (selectedModel === 'model1') {
      fetchLLMAya();
    }
  };

  const handleLoaderClick = () => {
    setLoading(false);
    if (controllerRef.current) {
      controllerRef.current.abort(); // قطع تمام درخواست‌ها
    }
  };

  return (
    <>
      <div className='flex items-center'>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} className='rounded-2xl w-3/4 px-4 py-2 focus:border-orange-500 border-none outline-none ' placeholder='پرسش خود را وارد نمایید' />
        {Loading && <span onClick={handleLoaderClick} className='mx-5 cursor-pointer'><CircleLoader /></span>}
        {
          !Loading && <button onClick={sendqiestion} className='bg-amber-600 px-4 py-2  rounded-2xl mx-4  border-amber-200 border-4 shadow-2xl'>
            <span className='text-lg font-semibold px-3'>
              ارسال
            </span>
            <span className="transform -rotate-90 inline-block text-xl mt-1">
              <FiSend />
            </span>
          </button>
        }
      </div>
    </>
  );
}
