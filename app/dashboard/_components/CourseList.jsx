'use client'
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

export default function CourseList() {
  const [courseList, setCourse] = useState([])
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  async function getCourseList() {
    try {
      setLoading(true);
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result);
      setCourse(result?.data?.result);

      setTotalCourse(result?.data?.result?.length);
      
    } catch (error) {
      console.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
   user && getCourseList()
  },[user])

  return (
  <div className="mt-10">
    <h2 className='font-bold text-2xl flex justify-between items-center mb-4'>Your Study Material
      <Button className='border-primary text-primary'  variant='outline' onClick={getCourseList}><RefreshCw/> Refresh</Button>
    </h2>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {loading==false ? courseList.map((course, index) => (
        <CourseCard course={course} key={index}/>
      )): [1,2,3,4,5,6].map((item,index)=>(
        <div className="h-56 w-full bg-slate-200 rounded-lg animate-pulse" key={index}>
        
      </div>
      ))
      }
    </div>

  </div>
  );
}
