"use client";
import { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import Header from "../dashboard/_components/Header";

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const {user} = useUser()
  const [loading, setLoading]= useState(false)
  const router = useRouter();

  function handleUserInput(fieldName, fieldValue) {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
    console.log(formData);
  }

  async function generateCourseOutline() {
    try {
      setLoading(true)
      const courseId = uuidv4();
      const result = await axios.post("api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
  
      console.log(result);
    } catch (error) {
      console.log(error.message);
      
    }finally{
      setLoading(false)
      router.replace('/dashboard')
      //toast notification
      toast("Your course is generating, Click on Refresh botton" )

    }

    
  }

  return (
  <section>
    <Header/>  
      <div className="flex flex-col items-center md:px-24 p-5 lg:px-36 mt-20">
        <div className=' w-full text-white  p-5 flex flex-col items-center gap-6 lg"px-36 mt-10'>
          <h2 className="font-bold text-4xl text-primary">
            Start Building Your Personal Study Material
          </h2>
          <p className="text-lg text-gray-500 ">
            Fill add details in order to generate study material for your next
            project
          </p>
        </div>
        <section>
          {step === 0 ? (
            <SelectOption
              selectedStudyType={(value) => handleUserInput("studyType", value)}
            />
          ) : (
            <TopicInput
              setTopic={(value) => handleUserInput("topic", value)}
              setDifficultyLevel={(value) =>
                handleUserInput("difficultyLevel", value)
              }
            />
          )}
        </section>
        <section className="flex justify-between w-full mt-32">
          {step != 0 ? (
            <Button varient="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          ) : (
            "-"
          )}
          {step == 0 ? (
            <Button varient="outline" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button varient="outline" onClick = {generateCourseOutline}>
              {loading?<Loader/>:"Generate"}
            </Button>
          )}
        </section>
      </div>
  </section>
  );
}
