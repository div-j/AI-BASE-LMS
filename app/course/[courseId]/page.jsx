'use client'
import Header from '@/app/dashboard/_components/Header'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'

export default function page() {
  const {courseId} = useParams()
  const [course, setCourse] = useState()

  
  const GetCourse  = async () => {
    const result = await axios.get(`/api/courses?courseId=${courseId}`)
    console.log(result.data)
    setCourse(result.data.result)
    
  }

  useEffect(()=>{
    GetCourse()
  },[])

  return (
    <div>
      <section >
        <CourseIntroCard course={course}/>
        <StudyMaterialSection courseId={courseId } course={course}/>
        <ChapterList  course={course}/>
      </section>
      
    </div>
  )
}
