import React, { useEffect, useState } from 'react'
import MaterialCard from './MaterialCard'
import axios from 'axios'
import Link from 'next/link'

export default function StudyMaterialSection({courseId, course}) {
    const [studyTypeContent, setStudyTypeContent] = useState()
    let materialList = [
        {
            name:'Notes',
            desc:'Read notes to prepare',
            icon:'/notes.png',
            path:'/notes',
            type:'notes'
        },
        {
            name:'Flashcards',
            desc:'Flashcard to help remember the concepts',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'flashcard'


        },
        {
            name:'Quiz',
            desc:'Great way test your knowledge',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz'

        },
        {
            name:'Question/Answer',
            desc:'Help to practice your learning',
            icon:'/qa.png',
            path:'/quiz',
            type:'qa'

        },
    ]

   async function GetstudyMaterial() {
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:"ALL"
        })

        console.log("studymaterial",result);
        setStudyTypeContent(result.data)
        
    }
    useEffect( () => {
        GetstudyMaterial()  
    },[])

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-5 mt-3'>
            {materialList.map((item,index)=>(

                <Link href={`/course/${courseId}${item.path}`} key={index}>
                    <MaterialCard item={item}
                     key={index} 
                     studyTypeContent={studyTypeContent} 
                     course={course}
                     refreshData={GetstudyMaterial}
                     />
                </Link>
            ) )}
        </div>
      
    </div>
  )
}
