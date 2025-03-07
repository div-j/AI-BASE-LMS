import React from 'react'

export default function ProgressStep({ count, data }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= count ? 'bg-primary' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
