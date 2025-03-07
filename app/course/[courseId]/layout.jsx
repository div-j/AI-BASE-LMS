import Header from '@/app/dashboard/_components/Header'
import React from 'react'

export default function CourseViewLayout({children}) {
  return (
    <div>
        <Header/>
        <main className='mx-10 md:mx-36 lg:max-w-7xl'>
            {children}
        </main>
      
    </div>
  )
}
