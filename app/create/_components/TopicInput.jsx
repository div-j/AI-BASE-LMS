import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function TopicInput({setTopic,setDifficultyLevel}) {
  return (
    <div className="w-full mt-10 flex flex-col">
      <h2>Enter topic or paste the content for which you want to Genereate </h2>
      <Textarea placeholder="Start Writing here" className="mt-2 w-full" 
      onChange={(e)=>setTopic(e.target.value)}/>
    
<h2 className="mt-5 mb-3">Select the difficulty Level</h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
