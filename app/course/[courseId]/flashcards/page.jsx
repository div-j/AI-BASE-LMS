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

const ProgressStep = dynamic(() => import("./_components/ProgressStep"), { ssr: false });

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
      console.log("Requesting flashcards for courseId:", courseId); // Log the courseId
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "flashcards",
      });
      console.log("API Response:", result?.data); // Log the response
      const data = result?.data;
      if (data && Array.isArray(data)) {
        setFlashcards(data); // Use the `questions` array
      } else {
        console.error("Expected an array of questions but got:", data);
        setFlashcards([]); // Fallback to an empty array
      }
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
    api.on("select", (index) => {
      setCount(index); // Update the count state
      setIsFlipped(false); // Reset the flip state
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
      {loading && (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!loading && flashcards.length === 0 && (
        <div className="flex items-center justify-center h-[80vh]">
          <p>No flashcards found. Please upload some content to generate flashcards.</p>
        </div>
      )}
      <ProgressStep count={count} data={flashcards} />
      <div className="mt-10">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcards.map((flashcard, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <FlashcardItem
                  handleClick={handleClick}
                  isFlipped={isFlipped}
                  flashcard={flashcard}
                />
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