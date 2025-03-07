import { db } from "@/config/db"
import { studyContentTypeTable } from "@/config/schema"
import { inngest } from "@/inngest/client"
import { NextResponse } from "next/server"


export async function POST(req) {
    const {chapters, courseId, type} = await req.json()

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
      }
      const PROMPT = type == "Flashcard"?`Generate the flashcard on topic: ${chapters} in JSON format with front-back content, maximum 15.`:
      'Generate Quiz on topic '+chapters+ "  with Questions and Options along with correct answer in JSON format max(10)."
        

    const result = await db.insert(studyContentTypeTable).values({
        courseId: courseId,
        type:type,
    }).returning({id: studyContentTypeTable.id})

    //triger inngest function 
    inngest.send({
        name: 'studyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    })


    return NextResponse.json( result[0].id)
    
}