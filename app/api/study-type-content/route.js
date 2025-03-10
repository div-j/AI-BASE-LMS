import { db } from "@/config/db";
import { studyContentTypeTable } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { chapters, courseId, type } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    const PROMPT = type === "Flashcard"
      ? `Generate the flashcard on topic: ${chapters} in JSON format with front-back content, maximum 15.`
      : `Generate Quiz on topic ${chapters} with Questions and Options along with correct answer in JSON format max(10).`;

    const result = await db.insert(studyContentTypeTable).values({
      courseId: courseId,
      type: type,
      status: "Generating"
    }).returning({ id: studyContentTypeTable.id });

    // Trigger inngest function
   await inngest.send({
      name: 'studyType.content',
      data: {
        studyType: type,
        prompt: PROMPT,
        courseId: courseId,
        recordId: result[0].id
      }
    });

    return NextResponse.json({ id: result[0].id });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}