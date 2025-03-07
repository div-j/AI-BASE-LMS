'use client'

import Image from 'next/image'
import React, { useState } from 'react'

export default function SelectOption({selectedStudyType}) {
    const [select , setSelect]  = useState()

    const options = [
        {
            name:'Exam',
            icon: '/exam_1.png'
        },
        {
            name: 'Job Interview',
            icon :'/job.png'
        },
        {
            name: 'Practice',
            icon :'/practice.png'
        },
        {
            name: 'Coding Prep',
            icon :'/code.png'
        },
        {
            name: 'Other',
            icon :'/knowledge.png'
        }
    ]

  return (
    <div>
        <h5 className='text-center mb-2 text-lg'>For which do you want to create your personal study material?</h5>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
            {
                options.map((option, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center cursor-pointer border rounded-xl hover:border-primary p-4 ${option.name === select && 'border-primary' }` }
                    onClick={()=>{setSelect(option.name);selectedStudyType(option.name)}}    
                    >
                        <Image src={option.icon} alt={option.name} width={50} height={50} />
                        <h2 className='text-sm mt-2'>{option.name}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
