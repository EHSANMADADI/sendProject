import React, { useEffect, useState } from 'react';
import './style.css';
import loader from '../images/loader.gif';
import EntitiesTable from '../componenet/EntitiesTable';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { LiaBackwardSolid } from "react-icons/lia";
import Question from '../componenet/Question';
import useStore from '../Store/store.ts';
import Modal from '../componenet/Modal';
import SelectModel from '../componenet/SelectModel.jsx';
export default function Secend() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { showQuestion, setShowQuestion } = useStore();
  const txt = localStorage.getItem('txt');
  const navigate = useNavigate();

  useEffect(() => {
    if (!txt) {
      setError('No text provided in the query parameters.');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5001/ner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: [txt] })
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, [txt]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase()
        ? `<span key=${index} class="bg-blue-500 text-white p-10 rounded-lg">${part}</span>`
        : part
    ).join('');
  };

  return (
    <div className='h-screen'>
      {response ? (
        <div className='flex' dir='rtl'>
          <div className='flex flex-col bg-gray-100 rounded-2xl w-2/3 mr-3'>
            <div className='p-5 mr-10'>
              <h4 className='text-xl font-bold py-4 ' >متن مورد نظر</h4>
              <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg max-h-96 overflow-y-scroll'>
                <div className='w-2/3 mx-auto text-center py-2'>
                  <div dangerouslySetInnerHTML={{ __html: getHighlightedText(response.predictions[0], selectedItem) }}></div>

                </div>

              </div>
              <div className='w-full'>
                <EntitiesTable entities={response.entities} onSelectItem={handleSelectItem} />
              </div>
              <div className='border-b-4 my-5'></div>
              <div >
                <h4 className='text-xl font-bold py-4 ' >پاسخ پرسش</h4>
                <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg h-56 overflow-y-scroll'>
                  <div className='w-2/3 mx-auto  py-2'>
                    <span className='text-gray-300 text-lg p-4'>پاسخ پرسش شما...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full mr-10 p-5'>
              <Question />
            </div>

          </div>
          <div className='flex flex-col p-5 w-1/3 text-center justify-start mt-10'>
            <SelectModel />
          </div>

          <Modal Open={showQuestion} onClose={() => setShowQuestion(false)} >
            <div>slam</div>
          </Modal>

        </div>

      ) : (
        <div className='flex w-full justify-center h-screen items-center'>
          <img src={loader} alt='Loading...' />
        </div>
      )}
    </div>
  );
}
