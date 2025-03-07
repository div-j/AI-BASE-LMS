import dynamic from "next/dynamic";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function CourseCard({ course }) {
  return (
    <div className="p-5 bg-white border rounded-lg shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <Image src={"/knowledge.png"} alt="other" width={50} height={50} />
        <h2 className="text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white">
          3 Feb 2025
        </h2>
      </div>
      <h2 className="mt-3 font-medium text-lg">
        {course?.courseLayout?.course_name}
      </h2>
      <p className="mt-3 line-clamp-2 text-gray-500 text-sm ">
        {course?.courseLayout?.course_summary}
      </p>
      <div>
        <Progress value={0} />
      </div>
      <div className="mt-3 flex justify-end">
        {course.status === "Generating" ? (
          <h2 className="p-2 rounded-full bg-gray-400 text-white text-[12px] flex items-center gap-2 text-sm">
            <RefreshCcw className="h-5 w-5 animate-spin" /> Generating...
          </h2>
        ) : (
          <Link href={`/course/${course?.courseId}`}>
            <Button>View</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
