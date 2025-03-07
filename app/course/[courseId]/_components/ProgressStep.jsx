import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProgressStep({ setCount, count, data }) {
  const steps = Array.isArray(data) ? data : [];

  return (
    <div className="flex items-center gap-2">
      {count !== 0 && (
        <Button onClick={() => setCount(count - 1)} variant='outline' size='sm'>
          Previous
        </Button>
      )}
      <div className="flex-1 flex items-center gap-2">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= count ? 'bg-primary' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
      {count < steps.length - 1 && (
        <Button onClick={() => setCount(count + 1)} variant='outline' size='sm'>
          Next
        </Button>
      )}
    </div>
  )
}
