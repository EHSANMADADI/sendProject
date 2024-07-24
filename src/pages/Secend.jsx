import React, { useEffect, useState } from 'react';
import './style.css';
import loader from '../images/loader.gif';
import EntitiesTable from '../componenet/EntitiesTable';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { LiaBackwardSolid } from "react-icons/lia";

export default function Secend() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
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
      }
       catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, [txt]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (error) {
  //     Swal.fire({
  //       title: "عملیات با خطا مواجه شد لطفا دوباره تلاش گنید",
  //       icon: "error"
  //     }).then(() => {
  //       navigate('/');
  //     });
  //   }
  // }, [error, navigate]);

  return (
    <div className='h-screen'>
      {response ? (
        <div className='p-2 flex items-center flex-wrap flex-col text-xl'>
          <div dangerouslySetInnerHTML={{ __html: response.predictions[0] }}></div>
          <div className='w-full'>
            <EntitiesTable entities={response.entities} />
          </div>
          <div onClick={()=>localStorage.removeItem('txt')} className='flex items-center px-5 py-3 bg-yellow-600 text-white font-semibold rounded-xl mt-10 hover:scale-75 hover:bg-yellow-400 duration-300'>
            <span className='p-1 m-1 text-2xl'><LiaBackwardSolid /></span>
            <Link to='/'>بازگشت به صفحه اصلی </Link>
          </div>
        </div>
      ) : (
        <div className='flex w-full justify-center h-screen items-center'>
          <img src={loader} alt='Loading...' />
        </div>
      )}
    </div>
  );
}
