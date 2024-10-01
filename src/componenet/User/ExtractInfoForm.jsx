import React from 'react'
import TabelInfo from './TabelInfo'

export default function ExtractInfoForm() {
  return (
    <div className='border-2 shadow-inner border-gray-200 rounded-md w-full h-full'>
        <div dir='rtl' className='m-3'>
            <input className='border-2 xl::w-2/6 w-4/6 border-gray-200 rounded-xl outline-none px-4 py-3 shadow-inner' placeholder='مشخصات فردی مورد نظر را سرچ کنید' />
        </div>
        <TabelInfo/>

    </div>
  )
}
