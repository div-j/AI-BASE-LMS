import { courseOulineAiModel } from "@/config/AiModel";
import { db } from "@/config/db";
import { studyMaterialTable } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();

    if (!courseId || !topic || !studyType || !difficultyLevel || !createdBy) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const PROMPT = `
    Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficultyLevel}. 
    Provide a summary of the course, a list of chapters (max 3) with summaries, and an emoji icon for each chapter. 
    Include topics in each chapter in JSON format. Ensure the content is formatted correctly for ${studyType}.
    Example:
    {
        "chapter_name": "Chapter 1",
        "chapter_summary": "Summary of chapter 1",
        "icon": "📘",
        "topics": [
            "Topic 1",
            "Topic 2"
        ]
    }
    `;

    const aiResponse = await courseOulineAiModel.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiResponse.response.text());

    // Save result to DB
    const dbResult = await db.insert(studyMaterialTable).values({
      courseId,
      courseType: studyType,
      createdBy,
      topic,
      courseLayout: aiResult
    }).returning({ resp: studyMaterialTable });

    await inngest.send({
      name: 'notes.generate',
      data: {
        course: dbResult[0].resp
      }
    });

    return NextResponse.json({ result: dbResult[0] });

  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
