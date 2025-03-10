import { db } from "../config/db";
import {
  NotechaptersTable,
  studyContentTypeTable,
  studyMaterialTable,
  usersTable,
} from "./../config/schema";
import { eq } from "drizzle-orm";
import { inngest } from "./client";
import {
  generateNotesAiModel,
  GenerateQuizAimodel,
  GenerateStudyTypeContentAiModel,
} from "@/config/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  // config
  { id: "create-user" },
  // trigger (event or cron)
  { event: "user.create" },
  // handler function
  async ({ event, step }) => {
    //Get event data
    console.log("Event Data:", event.data); // Log the entire event data
    try {
      const result = await step.run(
        "Check User and Create New user ",
        async () => {
          const { user } = event.data;
          const email = user?.primaryEmailAddress?.emailAddress;
          const name = user?.fullName;

          console.log("Extracted email:", email);
          console.log("Extracted name:", name);

          try {
            const result = await db
              .select()
              .from(usersTable)
              .where(eq(usersTable.email, email));

            console.log(result);

            if (result?.length == 0) {
              const userResp = await db
                .insert(usersTable)
                .values({
                  email: email,
                  name: name,
                })
                .returning({ id: usersTable.id });

              return userResp;
            }
            return result;
          } catch (error) {
            console.log(error.message);
            return { error: error.message };
          }
        }
      );
      return { result: result };
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  }
  //send welcome email notification

  //send email after 3 days of user creation
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Note Chapters", async () => {
      try {
        const Chapters = course?.courseLayout?.chapters;
        let index = 0;
        for (const chapter of Chapters) {
          const PROMPT = `Generate exam material detail for each chapter, make sure to include all the topics in the content, make sure to give content in html format (do not add HTML, Head, Body, title tag), the chapters: ${JSON.stringify(
            chapter
          )}`;
          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResp = await result.response.text();
          const insertResult = await db.insert(NotechaptersTable).values({
            chapterId: index,
            courseId: course.courseId,
            notes: aiResp,
          });
          console.log("Insert result:", insertResult); // Log insert result
          index += 1;
        }
        return { message: "Notes Generated" };
      } catch (error) {
        console.log("Error generating notes:", error.message);
        // return { error: error.message };
      }
    });

    // Update status to ready
    console.log("Updating course ID:", course.courseId);

    try {
      const updateCourseStatusResult = await step.run(
        "Update Course Status",
        async () => {
          const result = await db
            .update(studyMaterialTable)
            .set({ status: "Ready" })
            .where(eq(studyMaterialTable.courseId, course.courseId))
            .returning(); // Optional, if you need the updated row(s)
          return "success";
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    return { notes: notesResult };
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  // config
  { id: "Generate Study Type Content" },
  // trigger (event or cron)
  { event: "studyType.content" },
  // handler function
  async ({ event, step }) => {
    //Get event data
    const { studyType, prompt, courseId, recordId } = event.data;

    const AiResult = await step.run(
      "Generate flash card using AI ",
      async () => {
        try {
          const result = 
          studyType === "FlashCard"?
          await GenerateStudyTypeContentAiModel.sendMessage(prompt):
          await GenerateQuizAimodel.sendMessage(prompt);
          const AIResult = JSON.parse(result.response.text());
          return AIResult;
        } catch (error) {
          console.log(error.message);
        }
      }
    );
    //save the result

    try {
      const dbReult = await step.run("Save the result to DB", async () => {
        const result = await db.update(studyContentTypeTable)
          .set({
            content: AiResult,
            status: "Ready",
          })
          .where(eq(studyContentTypeTable.id, recordId));

        return { message: "success", result: result };
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);