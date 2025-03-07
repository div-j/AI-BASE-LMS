'use client'
import dynamic from "next/dynamic";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Button = dynamic(() => import("@/components/ui/button").then(mod => mod.Button), { ssr: false });
const ProgressStep = dynamic(() => import("../_components/ProgressStep").then(mod => mod.default), { ssr: false });

export default function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  const router = useRouter(); // Correctly use the useRouter hook
  const [loading, setLoading] = useState(false);

  const GetNotes = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: "ALL"
      });
      console.log(result?.data);
      setNotes(result?.data?.notes || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetNotes();
  }, []);

  const formatNotes = (note) => {
    return note.replace(/\\n/g, '<br/>').replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  };

  return (
    <section className='mt-10'>
      {loading && <div className='flex items-center justify-center h-[80vh]'><Loader2 /></div>}
      <ProgressStep setCount={setCount} count={count} data={notes} />
      <div className="mt-10">
        {notes.length > 0 && count < notes.length && (
          <div
            className="prose prose-lg max-w-none p-2"
            dangerouslySetInnerHTML={{ __html: formatNotes(notes[count]?.notes) }} />
        )}
        {count >= notes.length && (
          <div className="flex flex-col items-center gap-10 justify-end">
            <h2>End of Notes</h2>
            <Button onClick={() => router.back()} variant='outline' size='sm'>
              Go to Course Page
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
