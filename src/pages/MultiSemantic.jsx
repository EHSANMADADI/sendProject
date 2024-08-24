import React, { useState, useEffect } from 'react'
import localforage from 'localforage';
import useStore from '../Store/store.ts';
import Swal from 'sweetalert2';
import Question from '../componenet/Question.jsx';
import SelectModel from '../componenet/SelectModel.jsx';
import loader from'../images/loader.gif'
export default function MultiSemantic() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("")
  const [fullText, setFullText] = useState('');
  const [saveItems, setSaveItems] = useState([]);
  const { indexMultiple } = useStore();

  useEffect(() => {
    async function getSavedItems() {
        const storedItems = await localforage.getItem('multiSeavedItems');
        const items = JSON.parse(storedItems) || [];
        setSaveItems(items);
        console.log(items); // [[{}]]

        // بررسی اینکه آیا آرایه دارای عنصری در indexMultiple هست
        if (items.length > indexMultiple) {
            const selectedItem = items[indexMultiple];

            // دریافت responseText برای هر عنصر و اضافه کردن آن به fullText
            const newText = selectedItem.map(item => item.responseText+'\n'+'\n').join('\n');
            setFullText(newText); // فقط یک بار مقدار جدید را تنظیم کنید
        }
    }
    getSavedItems();
}, [indexMultiple]);
useEffect(() => {
    if (fullText) {
      const fetchData = async () => {
        try {
          const res = await fetch('http://195.191.45.56:17010/semantic_correction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: fullText })
          });
          if (!res.ok) {
            Swal.fire({
              title: `${res.statusText}`,
              icon: "error"
            });
            throw new Error(`HTTP error! status: ${res.status}`);
          }
  
          const data = await res.json();
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
    const regex = /\(([^)]+)\)/g;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="bg-blue-600 text-white px-2 py-1 mx-1 rounded-2xl inline-block">{part}</span>;
      }
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
              <Question setAnswer={setAnswer} />
            </div>

          </div>
          <div className='flex flex-col p-5 w-1/3 text-center justify-center'>
            <SelectModel/>
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
