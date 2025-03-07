import { boolean, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  isMember: boolean().notNull().default(false),
  customerId: varchar()
});



export const studyMaterialTable = pgTable("studyMaterial", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  dificultyLevel: varchar().default('Easy'),
  courseLayout:json(),
  createdBy: varchar().notNull(),
  status:varchar().default('Generating')
});

export const NotechaptersTable = pgTable("NoteChapters", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: varchar().notNull(),
  notes:text()
})


export const studyContentTypeTable = pgTable("studyTypeContent", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type:varchar().notNull(),
  status:varchar().default('Generating')
})


export const paymentRecordTable = pgTable("paymentRecordTable",{
  id:serial().primaryKey(),
  customerId: varchar(),
  sessionId: varchar()
})
