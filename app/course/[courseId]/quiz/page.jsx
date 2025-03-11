"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProgressStep from '../_components/ProgressStep';
import QuizCard from './_components/QuizCard';
import { LoaderPinwheel } from 'lucide-react';

export default function Quiz() {
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [answer, setAnswer] = useState(null);

  async function GetstudyMaterial() {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: "quiz"
    });

    setQuizData(result?.data);
    setQuizQuestions(result?.data?.questions || []);
    console.log("Quiz ", quizQuestions);

  }

  const checkAnswer = (userAnswer, currentQuestion) => {
    if (userAnswer === currentQuestion?.correctAnswer) {
      setIsCorrectAnswer(true);
      setAnswer(currentQuestion?.correctAnswer);
      return;
    }
    setIsCorrectAnswer(false);
    setAnswer(currentQuestion?.correctAnswer);
  }

  useEffect(() => {
    GetstudyMaterial();
  }, [courseId]);

  useEffect(() => {
    setAnswer(null);
    setIsCorrectAnswer(null);
  }, [step]);

  if (!quizData) {
    return <div className='flex items-center h-screen justify-center'>
      <LoaderPinwheel className='animate-spin'  size={24} />
    </div>;
  }

  return (
    <div className="space-y-10">
      <h2 className='font-bold text-2xl text-center mt-5'>{quizData.quizTitle}</h2>
      <ProgressStep data={quizQuestions} count={step} setCount={setStep} />
      {/* Render quiz questions here */}
      {quizQuestions.length > 0 && (
        <QuizCard quiz={quizQuestions[step]} userSelectedOption={(v) => checkAnswer(v, quizQuestions[step])} />
      )}
      <div>
        {isCorrectAnswer !== null && (
          isCorrectAnswer ? (
            <div className='bg-green-200 border border-green-700 p-2 rounded-lg'>
              <p className='font-bold text-center text-green-600 text-lg'>Correct Answer</p>
            </div>
          ) : (
            <div className='bg-red-200 border border-red-700 p-2 rounded-lg text-center'>
              <p className='font-bold text-red-600 text-lg'>Incorrect Answer</p>
              <p className='text-red-600'>Correct Answer is: <span className="font-semibold">{answer}</span></p>
            </div>
          )
        )}
      </div>
    </div>
  )
}