"use client"
import SideBar from './_components/SideBar'
import Header from './_components/Header';
import { CourseCountContext } from '../_context/CourseCountContext';
import { useState } from 'react';

export default function DashboardLayout({children}) {
  const [totalCourse, setTotalCourse] = useState(0);

  return (
    <CourseCountContext.Provider value={{totalCourse, setTotalCourse}}>

    <div>
        <section className='md:w-64 md:block fixed'>
            <SideBar/>
        </section>
        <section className='md:ml-64'>
            <Header/>
            <main className='p-10'>
                {children}
            </main>
        </section>
    </div>
    </CourseCountContext.Provider>

  )
}
