import React from 'react'
import FormAdd from './FormAdd'
import UserTabele from '../UsersList/UserTabele'
import LeftNav from '../UsersList/LeftNav'

export default function AddUser() {
    return (
        <div className='flex w-full justify-between p-5 h-screen'>
            <div className='w-1/5'>
                <LeftNav />
            </div>
            <div className='w-4/5'>
                <FormAdd />
                <UserTabele />
            </div>


        </div>
    )
}
