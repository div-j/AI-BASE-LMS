'use client';
import { Button } from "@/@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressStep from "../_components/ProgressStep";

export default function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { back } = useRouter(); // Use `back` instead of `route`

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      console.log("API Response:", result?.data);
      setNotes(result?.data?.notes || []); // Fallback to an empty array if no notes are found
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    GetNotes();
  }, []);

  if (loading) {
    return <div>Loading notes...</div>; // Show a loading message
  }

  if (notes.length === 0) {
    return <div>No notes found for this course.</div>; // Handle empty notes
  }

  return (
    <section className="mt-10">
      <ProgressStep setCount={setCount} count={count} data={notes} />
      <div className="mt-10">
        <div
          dangerouslySetInnerHTML={{
            __html: (notes[count]?.notes || "").replace("```html", " "),
          }}
          className="p-4"
        />
        {notes.length === count + 1 && ( // Check if it's the last note
          <div className="flex flex-col items-center gap-10 justify-end">
            <h2>End of Notes</h2>
            <Button onClick={() => back()} variant="outline" size="sm">
              Go to Course Page
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}