

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [hoveredWord, setHoveredWord] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

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
    let regex = /(\S+)\s*™([^\u2122]+)™/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const textPart = text.slice(lastIndex, match.index).trim();
        if (textPart) {
          // Split the text part into individual words and add each as a separate object
          textPart.split(' ').forEach(word => {
            if (word) {
              parts.push({ type: 'text', content: word });
            }
          });
        }
      }
      // Add the hover word and its alternatives
      parts.push({
        type: 'hover',
        word: match[1].trim(),
        alternatives: match[2].split(',').map((alt) => alt.trim())
      });
      lastIndex = regex.lastIndex;
    }

    // Add the remaining text after the last match
    if (lastIndex < text.length) {
      const textPart = text.slice(lastIndex).trim();
      if (textPart) {
        textPart.split(' ').forEach(word => {
          if (word) {
            parts.push({ type: 'text', content: word });
          }
        });
      }
    }

    console.log(parts);
    return parts;
  };

  const replaceWord = (originalWord, selectedAlternative) => {
    const newParsedText = parsedText.map((part) => {
      if (part.type === 'hover' && part.word === originalWord) {
        return { ...part, word: selectedAlternative }; // Replace the word in hover type
      }
      return part; // Return other parts unchanged
    });
  
    // Update both text and parsedText based on the new structure
    const updatedText = newParsedText.map(part => part.type === 'text' ? part.content : part.word).join(' ');
    
    setText(updatedText);
    setParsedText(newParsedText);
    
    setIsSelecting(false);
    setHoveredWord(null);
    setEditingIndex(null);
    setEditingText('');
  };
  


  const handleEditingBlur = () => {
    if (editingIndex !== null && editingText !== '') {
      const newParsedText = [...parsedText];

      // بررسی اینکه آیا کلمه انتخاب شده از نوع 'text' است
      if (newParsedText[editingIndex].type === 'text') {
        // فقط محتوای آن کلمه را تغییر دهید
        newParsedText[editingIndex] = { type: 'text', content: editingText };
      } else if (newParsedText[editingIndex].type === 'hover') {
        // اگر کلمه از نوع hover است، کلمه اصلی را به‌روز کنید
        newParsedText[editingIndex] = { ...newParsedText[editingIndex], word: editingText };
      }
      ////////////////
      const updatedText = newParsedText.map(part => part.type === 'text' ? part.content : part.word).join(' ');
      setText(updatedText);
      console.log('new text edited: ', updatedText);
      /////////////////////

      setParsedText(newParsedText);
      console.log("EDIT NEW PARSEtEXT", newParsedText);
      // پاکسازی وضعیت ویرایش
      setEditingIndex(null);
      setEditingText('');
    }
  };


  return (
    <div className='h-screen'>
      {response ? (
        <div className='flex' dir='rtl'>
          <div className='flex flex-col bg-gray-100 rounded-2xl w-2/3 mr-3'>
            <div className='p-5 mr-10'>
              <h4 className='text-xl font-bold py-4'>متن مورد نظر</h4>
              <div className='bg-white border-dotted border-2 border-gray-200 rounded-2xl leading-10 font-semibold text-lg max-h-80 overflow-y-auto p-5'>
                <div>
                  {parsedText.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <React.Fragment key={index}>
                          {editingIndex === index ? (
                            <input
                              className='w-20 border-none outline-none bg-slate-200'
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onBlur={handleEditingBlur}
                              autoFocus
                            />
                          ) : (
                            <span
                              onClick={() => {
                                if (editingIndex === null) {
                                  setEditingIndex(index);
                                  setEditingText(part.content);
                                }
                              }}
                            >
                              {part.content + ' '}
                            </span>
                          )}
                        </React.Fragment>
                      );
                    }

                    if (part.type === 'hover') {
                      return (
                        <React.Fragment key={index} >
                          <div className='relative inline-block'>
                            {editingIndex === index ? (
                              <input
                                className='w-20 border-none outline-none bg-slate-200'
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onBlur={handleEditingBlur}
                                autoFocus
                              />
                            ) : (
                              <span
                                className="cursor-pointer text-blue-600 underline px-1 inline relative hoverable-word"
                                onMouseEnter={() => setHoveredWord(part.word)}
                                onClick={() => {
                                  setEditingIndex(index);
                                  setEditingText(part.word);
                                }}
                              >
                                {part.word + ' '}
                              </span>
                            )}

                            {hoveredWord === part.word && (
                              <div
                                className="hover-alternatives"
                                onMouseEnter={() => setIsSelecting(true)}
                                onMouseLeave={() => {
                                  setIsSelecting(false);
                                  setHoveredWord(null);
                                }}
                              >
                                {part.alternatives.map((alt, altIndex) => (
                                  <div
                                    key={altIndex}
                                    className="cursor-pointer p-1 rounded-md bg-white my-1 hover:bg-gray-300"
                                    onClick={() => replaceWord(part.word, alt)}
                                  >
                                    {alt}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </React.Fragment>
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
              <Question setAnswer={setAnswer} fullText={text} />
            </div>
          </div>
          <div className='flex flex-col p-5 w-1/3 text-center justify-center'>
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
