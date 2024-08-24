import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import useStore from '../Store/store.ts';

export default function MultipleNER() {
    const [saveItems, setSaveItems] = useState([]);
    const [fullText, setFullText] = useState('');
    const { indexMultiple, ChangeIndexMultiple } = useStore();
console.log(indexMultiple);

    useEffect(() => {
        async function getSavedItems() {
            const storedItems = await localforage.getItem('multiSeavedItems');
            const items = JSON.parse(storedItems) || [];
            setSaveItems(items);
            console.log(items);//[[{}]]
            
            
            // بررسی اینکه آیا آرایه دارای عنصری در indexMultiple هست
            if (items.length > indexMultiple) {
                const selectedItem = items[indexMultiple];
                
                // دریافت responseText برای هر عنصر و اضافه کردن آن به fullText
                const newText = selectedItem.map(item => item.responseText).join(' ');
                setFullText(prevText => prevText + newText);
            }
        }
        getSavedItems();
    }, [indexMultiple]); // هر بار که indexMultiple تغییر کرد، این اثر دوباره اجرا می‌شود.

    return (
        <div>
            <p>MultipleNER</p>
            <p>{fullText}</p> {/* نمایش fullText */}
        </div>
    );
}
