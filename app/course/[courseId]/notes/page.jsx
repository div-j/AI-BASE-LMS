'use client'
import { Button } from "@/@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProgressStep from "../_components/ProgressStep"

export default function ViewNotes() {
    const {courseId} =useParams()
    const [notes, setNotes] = useState()
    const [count, setCount] = useState(0)
    const {route} = useRouter()

    const GetNotes = async () => {
        
        const result = await axios.post('/api/study-type',
          {
            courseId:courseId,   
            studyType:"ALL"
          })
        console.log(result?.data);
        setNotes(result?.data?.notes)
    }

    useEffect(()=>{
        GetNotes()
    },[])
  return (
    <section>
      <ProgressStep setCount={setCount} count={count} data={notes} />
      <div className="mt-10">
        <div dangerouslySetInnerHTML={{__html:(notes[count]?.notes)?.replace('```html',' ')}} />
        {
          notes?.length===count &&(
            <div className="flex flex-col items-center gap-10 justify-end">
              <h2>End of Notes</h2>
              <Button onClick={()=>route.back()} variant='outline' size='sm'>
                Go to Course Page 
              </Button>
            </div>
          )
        }
      </div>
      
    </section>
  )
}
