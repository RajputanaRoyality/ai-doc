import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path:'/home'
    },
    {
        id: 2,
        name: 'History',
        path: '/history'
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/pricing'
    },
    {
        id: 4,
        name: 'Profile',
        path: '/profile'
    },
]

function AppHeader () {
  return (
      <div className='flex gap-100 justify-center shadow'>
          <Image className='justify-left' src={'/logo.svg'} alt='logo' width={40} height={50}/>
          <div className='hidden md:flex gap-13 items-center'>
              {menuOptions.map((option, index) => (
                  <div key={index}>
                      <h2 className='hoverr:font-bold cursor-pointer transition-all'>{option.name}</h2>
                  </div>
              ))}
          </div>
          <UserButton/>
    </div>
  )
}

export default AppHeader