import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import loader from '../images/loader.gif';
import { Link } from "react-router-dom";
import { LiaBackwardSolid } from "react-icons/lia";
import useStore from '../Store/store.ts';
import Modal from '../componenet/Modal.jsx';
import Question from '../componenet/Question.jsx';
import SelectModel from '../componenet/SelectModel.jsx';
export default function Spelling() {
  const txt = localStorage.getItem('txt');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { showQuestion, setShowQuestion } = useStore();
  const [answer, setAnswer] = useState("")
  useEffect(() => {
    if (!txt) {
      setError('No text provided in the query parameters.');
      Swal.fire({
        title: "No text provided in the query parameters.",
        icon: "error"
      });
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('http://195.191.45.56:17010/spell_correction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: txt })
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
  }, [txt]);

  const parseText = (text) => {
    const regex = /\(([^)]+)\)/g;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="bg-green-700 text-white px-2 py-1 mx-1 rounded-2xl inline-block">{part}</span>;
      }
      return part;
    });
  };

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
