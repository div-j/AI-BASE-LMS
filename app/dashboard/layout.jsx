"use client"
import SideBar from './_components/SideBar'
import Header from './_components/Header';
import { CourseCountContext } from '../_context/CourseCountContext';
import { useState } from 'react';

export default function DashboardLayout({children}) {
  const [totalCourse, setTotalCourse] = useState(0);

  return (
    <CourseCountContext.Provider value={{totalCourse, setTotalCourse}}>

    <div className="flex h-screen">
        <section className=''>
            <SideBar/>
        </section>
        <section className="flex-1 overflow-y-auto ">
          <Header />
          <main className="p-5 md:p-10">{children}</main>
        </section>
    </div>
    </CourseCountContext.Provider>

  )
}
