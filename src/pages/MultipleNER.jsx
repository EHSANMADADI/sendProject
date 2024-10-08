import React, { useState, useEffect } from 'react';
import useStore from '../Store/store.ts';
import EntitiesTable from'../componenet/EntitiesTable.jsx';
import Question from '../componenet/Question.jsx';
import SelectModel from '../componenet/SelectModel.jsx';
import loader from '../images/loader.gif';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import  BackYoHome from '../componenet/BackYoHome.jsx'
import { toast } from 'react-toastify';
export default function MultipleNER() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [saveItems, setSaveItems] = useState([]);
    const [fullText, setFullText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [answer, setAnswer] = useState("")
    const { indexMultiple } = useStore();
    console.log(indexMultiple);

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
                    const newText = selectedItem.map(item => item.responseText + '\n' + '\n').join('\n');
                    setFullText(newText); // فقط یک بار مقدار جدید را تنظیم کنید
                }
            } catch (err) {
                console.error('Error retrieving items from localStorage:', err);
            }
        }    
        getSavedItems();
    }, []);
    
    


    useEffect(() => {
        if (!fullText) {
            setError('No text provided in the query parameters.');
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('http://195.191.45.56:17010/ner', {
                    method: 'POST',
                    // mode:'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: [fullText] })
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
        };
        fetchData();
    }, [fullText]);

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
                                    <div className='w-11/12 mx-auto  py-2'>
                                        {answer === '' && <span className='text-gray-300 text-lg p-4'>پاسخ پرسش شما...</span>}
                                        {
                                            answer !== '' && <p className='text-gray-800 text-lg p-2E'>{answer}</p>
                                        }
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mr-10 p-5'>
                            <ToastContainer />
                            <Question setAnswer={setAnswer} fullText={fullText} />
                        </div>

                    </div>
                    <div className='flex flex-col p-5 w-1/3 text-center justify-start mt-10'>
                        <SelectModel />
                        <BackYoHome path='Multipel' />
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
