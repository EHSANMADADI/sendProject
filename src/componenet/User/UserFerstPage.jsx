import React from 'react'
import LeftNavUser from './LeftNavUser'
import ExtractInfoForm from './ExtractInfoForm'

export default function UserFerstPage() {
    return (
        <div className='flex w-full justify-between p-5 h-screen'>
            <div className='w-1/5'>
                <LeftNavUser />
            </div>
            <div className='w-3/5 mx-auto'>
                <ExtractInfoForm />

            </div>

        </div>
    )
}
