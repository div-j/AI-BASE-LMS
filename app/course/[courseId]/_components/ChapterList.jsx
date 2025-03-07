import React from "react";

export default function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters;
  console.log(CHAPTERS);
  
  return (
    <div className="mt-5">
      <h2 className=" font-medium text-lg">Chapters</h2>
      <div className="mt-3">
        {CHAPTERS?.map((chapter, index) => (
          <div key={index} className="flex items-center gap-3 p-4 border shadow-md mb-2 rounded-full ">
            <h2 className="text-2xl">{chapter?.icon}</h2>
            <div>
              <h2 className="text-lg font-medium">
                {chapter?.chapter_name }
              </h2>
              <p className="text-gray-500 text-sm">{chapter?.chapter_summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
