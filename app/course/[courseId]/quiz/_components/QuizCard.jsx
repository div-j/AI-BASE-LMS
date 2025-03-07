"use client"
import React, { useState } from 'react'

export default function QuizCard({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!quiz) {
    return <div>No quiz data available</div>;
  }



  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h3 className="font-bold text-xl mb-4">{quiz.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedOption(option);
    userSelectedOption(option);
            }}
            className={`p-2 h-20 rounded-lg hover:bg-gray-300 ${
              selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
