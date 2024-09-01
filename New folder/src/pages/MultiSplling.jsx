import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import localforage from 'localforage';
import useStore from '../Store/store.ts';
import Question from '../componenet/Question.jsx';
import SelectModel from '../componenet/SelectModel.jsx';
import loader from '../images/loader.gif'
import BackYoHome from '../componenet/BackYoHome.jsx'
import { Type } from 'docx';
export default function MultiSplling() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("")
  const [fullText, setFullText] = useState('');
  const [saveItems, setSaveItems] = useState([]);
  const { indexMultiple } = useStore();

  useEffect(() => {
    function getSavedItems() {
      try {
        const items = localStorage.getItem('multiSeavedItems');
        const parsedItems = items ? JSON.parse(items) : [];
        setSaveItems(parsedItems);
        console.log(parsedItems); // [[{}]]

        // بررسی اینکه آیا آرایه دارای عنصری در indexMultiple هست
        if (parsedItems.length > indexMultiple) {
          const selectedItem = parsedItems[indexMultiple];

          // دریافت responseText برای هر عنصر و اضافه کردن آن به fullText
          const newText = selectedItem.map(item => item.responseText).join('');
          setFullText(newText); // فقط یک بار مقدار جدید را تنظیم کنید
        }
      } catch (err) {
        console.error('Error retrieving items from localStorage:', err);
      }
    }

    getSavedItems();
  }, []);


  useEffect(() => {
    if (fullText !== '') {
      const fetchData = async () => {
        console.log(typeof (fullText));
        console.log(fullText)
        try {
          const res = await fetch('http://195.191.45.56:17010/spellcheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ sentence: fullText })
            body: JSON.stringify({ sentence: fullText })
          });
          if (!res.ok) {
            Swal.fire({
              title: `${res.statusText}`,
              icon: "error"
            });
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data);
          setResponse(data);
          console.log(res);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data.');
        }
      };

      fetchData();
    }
  }, [fullText]);




  const parseText = (text) => {
    const regex = /\^([^^]+)\^/g;

    // تابعی برای مدیریت کلیک روی کلمه
    const handleClick = (word) => {
      console.log(word);
    };

    return text.split(regex).map((part, index) => {
      // اگر ایندکس فرد است، این بخش شامل کلمات بین ^ها است
      if (index % 2 === 1) {
        // تقسیم کردن بخش به کلمات با ,
        const words = part.split(',');

        // ساختن span برای هر کلمه
        return (
          <span key={index} className="bg-green-700 text-white px-2 py-1 mx-1 rounded-2xl inline-block">
            {words.map((word, i) => (
              <span
                key={i}
                className={`cursor-pointer mx-1 px-2 py-1 rounded-2xl ${i === 0 ? 'border-2 border-red-200 text-red-400' : 'bg-green-700 text-white'}`}
                onClick={() => handleClick(word.trim())}
              >
                {word.trim()}
              </span>
            ))}
          </span>
        );
      }
      // در غیر این صورت بخش عادی است
      return part;
    });
  }






  return (
    <div className='h-screen'>
      {response ? (
        <div className='flex' dir='rtl'>
          <div className='flex flex-col bg-gray-100 rounded-2xl w-2/3 mr-3'>
            <div className='p-5 mr-10'>
              <h4 className='text-xl font-bold py-4 ' >متن مورد نظر</h4>
              <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg max-h-72 overflow-y-scroll'>
                <div className='w-2/3 mx-auto text-center py-2'>

                  {parseText(response.corrected_text)}

                </div>
              </div>
              <div className='border-b-4 my-5'></div>

              <div >
                <h4 className='text-xl font-bold py-4 ' >پاسخ پرسش</h4>
                <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg h-72 overflow-y-scroll'>
                  <div className='w-2/3 mx-auto  py-2'>
                    {answer === '' && <span className='text-gray-300 text-lg p-4'>پاسخ پرسش شما...</span>}
                    {
                      answer != '' && <p className='text-gray-800 text-lg p-2E'>{answer}</p>
                    }
                  </div>
                </div>
              </div>

            </div>
            <div className='w-full mr-10 p-5'>
              <Question setAnswer={setAnswer} fullText={fullText} />
            </div>

          </div>
          <div className='flex flex-col p-5 w-1/3 text-center justify-center'>
            <SelectModel />
            <BackYoHome path='multiple' />
          </div>



        </div>

      ) : (
        <div className='flex w-full justify-center h-screen items-center'>
          <img src={loader} alt='Loading...' />
        </div>
      )}
    </div>
  )
}