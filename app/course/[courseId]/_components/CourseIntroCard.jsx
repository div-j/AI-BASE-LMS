import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export default function CourseIntroCard({ course }) {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-5 border shadow-md rounded-lg p-10 mt-5">
      <Image src={"/knowledge.png"} alt="other" width={70} height={70} />
      <div>
        <h2 className="font-bold text-2xl">{course?.courseLayout?.course_name}</h2>
        <p className="text-sm ">{course?.courseLayout?.course_summary}</p>
        <Progress value={0} className="mt-3" />
        <h2 className="mt-3 text-lg text-primary">
          Total Chapter: {course?.courseLayout.chapters?.length}
        </h2>
      </div>
    </section>
  );
}
