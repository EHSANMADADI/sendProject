import React, { useState } from 'react';

const EntitiesTable = ({ entities, onSelectItem }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        setSelectedItem(item);
        onSelectItem(item); // صدا زدن تابعی که از والد آمده
    };

    const renderTable = (title, items) => {
        if (items.length) {
            return (
                <div className='flex w-80 h-full' key={title}>
                    <div className='flex flex-col w-full h-full'>
                        <h3 className='font-semibold text-xl p-2 my-3 h-full'>{title}</h3>
                        <div className='p-5 border-2 border-yellow-600 rounded-md h-60 overflow-auto'>
                            {
                                items.map((item, index) => (
                                    <span 
                                        key={index} 
                                        onClick={() => handleClick(item)}
                                        className={selectedItem === item ? 'selected-item' : ''}
                                    >
                                        {item} - 
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    };

    return (
        <div className='flex flex-wrap justify-evenly h-full w-full' dir='rtl'>
            {Object.keys(entities).map((key) => renderTable(key, entities[key]))}
        </div>
    );
};

export default EntitiesTable;
