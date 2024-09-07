import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import localforage from 'localforage';
import useStore from '../Store/store.ts';
import Question from '../componenet/Question.jsx';
import SelectModel from '../componenet/SelectModel.jsx';
import loader from '../images/loader.gif';
import BackYoHome from '../componenet/BackYoHome.jsx';

export default function MultiSplling() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [fullText, setFullText] = useState('');
  const [saveItems, setSaveItems] = useState([]);
  const { indexMultiple } = useStore();
  const [text, setText] = useState('');
  const [parsedText, setParsedText] = useState([]);

  useEffect(() => {
    function getSavedItems() {
      try {
        const items = localStorage.getItem('multiSeavedItems');
        const parsedItems = items ? JSON.parse(items) : [];
        setSaveItems(parsedItems);

        if (parsedItems.length > indexMultiple) {
          const selectedItem = parsedItems[indexMultiple];
          const newText = selectedItem.map(item => item.responseText).join('');
          setFullText(newText);
          setText(newText); // Set initial text state
        }
      } catch (err) {
        console.error('Error retrieving items from localStorage:', err);
      }
    }

    getSavedItems();
  }, [indexMultiple]);

  useEffect(() => {
    if (fullText !== '') {
      const fetchData = async () => {
        try {
          const res = await fetch('http://195.191.45.56:17010/spellcheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
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
          setResponse(data);
          const correctedText = data.corrected_text;
          setText(correctedText); // Update text with corrected text
          setParsedText(parseText(correctedText)); // Update parsed text
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data.');
        }
      };

      fetchData();
    }
  }, [fullText]);

  const parseText = (text) => {
    const parts = [];
    let regex = /(\S+)\s*\^([^^]+)\^/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({
        type: 'hover',
        word: match[1].trim(),
        alternatives: match[2].split(',').map((alt) => alt.trim())
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts;
  };

  const [hoveredWord, setHoveredWord] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const replaceWord = (originalWord, selectedAlternative) => {
    const regex = new RegExp(originalWord, 'gi'); // جایگزینی ساده بدون استفاده از \b برای آزمایش
    const newText = text.replace(regex, selectedAlternative);
    console.log("New Text:", newText);
    setText(newText);
  
    const newParsedText = parseText(newText);
    setParsedText(newParsedText);
    setIsSelecting(false);
    setHoveredWord(null);
  };
  
  

  return (
    <div className='h-screen'>
      {response ? (
        <div className='flex' dir='rtl'>
          <div className='flex flex-col bg-gray-100 rounded-2xl w-2/3 mr-3'>
            <div className='p-5 mr-10'>
              <h4 className='text-xl font-bold py-4'>متن مورد نظر</h4>
              <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg max-h-80 overflow-auto p-5'>
                <div>
                  {parsedText.map((part, index) => {
                    if (part.type === 'text') {
                      return <span key={index}>{part.content}</span>;
                    }

                    if (part.type === 'hover') {
                      return (
                        <span key={index} style={{ position: 'relative', display: 'inline-block' }}>
                          <span
                            onMouseEnter={() => setHoveredWord(part.word)}
                            onMouseLeave={() => !isSelecting && setHoveredWord(null)}
                            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                          >
                            {part.word}
                          </span>
                          {hoveredWord === part.word && (
                            <div
                              style={{
                                position: 'absolute',
                                backgroundColor: 'lightgray',
                                padding: '5px',
                                borderRadius: '5px',
                                top: '100%',
                                left: '0',
                                zIndex: 10,
                                opacity: 1,
                                transform: 'translateY(0)',
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                              }}
                              onMouseEnter={() => setIsSelecting(true)}
                              onMouseLeave={() => {
                                setIsSelecting(false);
                                setHoveredWord(null);
                              }}
                            >
                              {part.alternatives.map((alt, altIndex) => (
                                <div
                                  key={altIndex}
                                  onClick={() => replaceWord(part.word, alt)}
                                  style={{ cursor: 'pointer', padding: '2px 5px', borderRadius: '3px', backgroundColor: 'white', margin: '2px 0' }}
                                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                                >
                                  {alt}
                                </div>
                              ))}
                            </div>
                          )}
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
              <div className='border-b-4 my-5'></div>

              <div>
                <h4 className='text-xl font-bold py-4'>پاسخ پرسش</h4>
                <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg h-72 overflow-y-scroll'>
                  <div className='w-2/3 mx-auto py-2'>
                    {answer === '' && <span className='text-gray-300 text-lg p-4'>پاسخ پرسش شما...</span>}
                    {answer !== '' && <p className='text-gray-800 text-lg p-2'>{answer}</p>}
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
  );
}
