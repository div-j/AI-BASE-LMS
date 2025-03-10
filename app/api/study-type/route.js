import { db } from "@/config/db";
import { NotechaptersTable, studyContentTypeTable } from "@/config/schema";
import { eq, and } from "drizzle-orm"; // Import the and function
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();
    console.log("Received courseId:", courseId); // Log the courseId value
    console.log("Received studyType:", studyType); // Log the studyType value

    if (studyType === 'ALL') {
      const notes = await db.select().from(NotechaptersTable)
        .where(eq(NotechaptersTable.courseId, courseId));

      if (notes.length === 0) {
        console.log("No notes found for courseId:", courseId); // Log if no notes are found
      }

      const contentList = await db.select().from(studyContentTypeTable)
        .where(eq(studyContentTypeTable?.courseId, courseId));

      const result = {
        notes: notes,
        flashcard: contentList?.find(item => item?.type === "Flashcard")?.content || [],
        quiz: contentList?.find(item => item?.type === "Quiz")?.content || [],
        qa: contentList?.find(item => item?.type === "QA")?.content || []
      };

      return NextResponse.json(result);

    } else if (studyType === 'notes') {
      const notes = await db.select().from(NotechaptersTable)
        .where(eq(NotechaptersTable?.courseId, courseId));

      if (notes.length === 0) {
        console.log("No notes found for courseId:", courseId); // Log if no notes are found
      }

      return NextResponse.json(notes);
    } else {
      const result = await db.select().from(studyContentTypeTable)
        .where(and(eq(studyContentTypeTable?.courseId, courseId),
          eq(studyContentTypeTable.type, studyType)));

      if (result.length === 0) {
        console.log("No content found for courseId:", courseId); // Log if no content is found
      }

      return NextResponse.json(result[0]?.content || []);
    }

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}