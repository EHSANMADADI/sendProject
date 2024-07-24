import React, { useEffect,useState } from 'react'
import Swal from 'sweetalert2';
import loader from '../images/loader.gif';
import { Link } from "react-router-dom";
import { LiaBackwardSolid } from "react-icons/lia";
export default function Semantic() {
  const txt = localStorage.getItem('txt');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!txt) {
      setError('No text provided in the query parameters.');
      return(
        Swal.fire({
          title: "No text provided in the query parameters.",
          icon: "error"
        })
      )
    }

    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5001/correct_text', {
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
          })
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
  
  return (
    <div className='bg-gray-100 h-screen'>
      {response ? (
        <div className='p-2 flex items-center flex-wrap flex-col text-xl'>
          
          <div className='flex' dir='rtl'> 
          {
            response.corrected_text
          }
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
  )
}
