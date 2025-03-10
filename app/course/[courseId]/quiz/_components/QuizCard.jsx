"use client"
import React from 'react'

export default function QuizCard({quiz, userSelectedOption}) {
const  [selectedOption, setSelectedOption] = React.useState(null);


  return (
    <div className='mt-10 p-5'>
        <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {
            quiz?.options.map((option, index) => (
              <h2 className={`font-medium text-lg text-center w-full rounded-full border p-3 hover:bg-gray-200 cursor-pointer
               
                ${selectedOption === option ? 'bg-primary text-whit hover:bg-primary' : ''}
                `
              } key={index}
              onClick={() =>{ setSelectedOption(option)
                userSelectedOption(option)
              }}
              >
                {option}
              </h2>
            ))
          }
            
        </div>
      
    </div>
  )
}
