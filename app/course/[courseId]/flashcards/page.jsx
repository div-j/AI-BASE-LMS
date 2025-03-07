"use client";
import dynamic from "next/dynamic";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";

const ProgressStep = dynamic(() => import("./_components/ProgressStep").then(mod => mod.default), { ssr: false });

export default function FlashCard() {
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [count, setCount] = useState(0);
  const { courseId } = useParams();
  const [api, setApi] = useState();
  const [loading, setLoading] = useState(false);

  const getFlashCards = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "Flashcards",
      });
      setFlashcards(result?.data || []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlashCards();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', (index) => {
      setCount(index);
      setIsFlipped(false);
    });
  }, [api]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="mt-10">
      <div className="my-5">
        <h2 className="font-bold text-2xl">Flashcards</h2>
        <p>Flashcards: The ultimate Tool to Lock in Concepts!</p>
      </div>
      {loading && <div className='flex items-center justify-center h-[80vh]'><Loader2 /></div>}
      <ProgressStep count={count} data={flashcards} />
      <div className="mt-10">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcards?.map((flashcard, index) => (
              <CarouselItem key={index} className='flex items-center justify-center'>
                <FlashcardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
