import { db } from "@/config/db";
import { studyMaterialTable } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { createdBy } = await req.json();
    const result = await db
      .select()
      .from(studyMaterialTable)
      .where(eq(studyMaterialTable.createdBy, createdBy))
      .orderBy(desc(studyMaterialTable.id)); // Add this line to sort by id in descending order

    return NextResponse.json({ result: result });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error();
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  try {
    const course = await db
      .select()
      .from(studyMaterialTable)
      .where(eq(studyMaterialTable.courseId, courseId));

    if (course.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ result: course[0] });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error();
  }
}



