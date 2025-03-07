import { Button } from "@/@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export default function MaterialCard({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    toast("Generating your content...");
    setLoading(true);
    let chapters = '';
    course?.courseLayout?.chapters?.forEach(chapter => {
      chapters += chapter.chapter_name + ',' + chapters;
    });

    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters
    });
    setLoading(false);
    refreshData(true);
    toast("Content generated successfully", { type: 'success', color: 'green' });
    // console.log(result);
  }

  return (
    <div
      className={`p-5 bg-white border rounded-lg shadow-md flex flex-col items-center justify-center
    ${studyTypeContent?.[item.type]?.length == null && "grayscale"}
    `}
    >
      {studyTypeContent?.[item.type]?.length == null ? (
        <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Ready
        </h2>
      )}
      <Image src={item.icon} alt="other" width={50} height={50} />
      <h2 className="mt-3 text-center text-sm text-gray-500">{item.name}</h2>
      <p className="text-center mt-3 line-clamp-2 text-gray-500 text-sm ">
        {item.desc}
      </p>
      {studyTypeContent?.[item.type]?.length == null ? (
        <Button onClick={() => generateContent()} className="mt-3 w-full" variant="outline">
          {loading && <RefreshCcw className='animate-spin' />}
          Generate
        </Button>
      ) : (
        <Button className="mt-3 w-full" variant="outline">
          View
        </Button>
      )}
    </div>
  );
}
