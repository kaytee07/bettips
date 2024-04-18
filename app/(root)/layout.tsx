import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='relative'>
        <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <section className='flex min-h-screen w-full flex-1 flex-col px-6 pb-6 pt-6 
        max-md:pb-14 sm:px-14'>
                {children}
        </section>
      </div>
      Footer
    </div>
  )
}

export default HomeLayout