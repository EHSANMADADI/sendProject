import React from 'react'
import img from '../images/image 63.svg';
import BackYoHome from './BackYoHome';
export default function SelectModel() {
    return (
        <div className='flex flex-col'>
            <div className='flex items-center text-center justify-center'>
                <img src={img} alt='img' />
                <span className='font-black text-lg px-2'>مدل خود را انتخاب کنید</span>
            </div>
            <div className='border-b-2 my-5 border-black w-2/3 mx-auto'></div>
            <div className='flex my-5 flex-col justify-center'>
                <div className="flex items-center justify-center me-4">
                    <input id="yellow-radio" type="radio" value="model1" name="colored-radio" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-2" />
                    <label htmlFor="yellow-radio" className="ms-2 text-lg font-medium">
                        <span className='text-gray-500 mx-1'>مدل اول:</span>
                        <span className='text-black'>درنا</span>
                    </label>
                </div>
                <div className="flex items-center justify-center me-4">
                    <input id="yellow-radio" type="radio" value="model2" name="colored-radio" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-2" />
                    <label htmlFor="yellow-radio" className="ms-2 text-lg font-medium text-gray-900">
                        <span className='text-gray-500 mx-1'>مدل دوم:</span>
                        <span className='text-black'>درنا</span>
                    </label>
                </div>
            </div>
            <div className='border-b-2 my-5 border-black w-2/3 mx-auto'></div>
            <BackYoHome/>
 

        </div>
    )
}
