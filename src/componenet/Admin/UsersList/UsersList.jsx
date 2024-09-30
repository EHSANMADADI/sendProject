import React from 'react'
import UserTabele from '../UsersList/UserTabele'
import LeftNav from './LeftNav'
import Search from './Search'
export default function UsersList() {
  return (
    <div className='flex w-full justify-between p-5 h-screen'>
      <div className='w-1/5'>
        <LeftNav />
      </div>
      <div className='w-4/5'>
        <Search />
        <UserTabele />
      </div>


    </div>
  )
}
