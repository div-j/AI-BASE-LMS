import React from "react";
import ReactCardFlip from "react-card-flip";

export default function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-4 bg-primary text-white flex items-center justify-center rounded-lg shadow-md cursor-pointer  h-[250px] w-[200px] md:h-[350px] md:w-[300px] "
          onClick={handleClick}
        >
          <h2 className="text-center">{flashcard?.front}</h2>
        </div>

        <div
          className="p-4 bg-primary text-white flex items-center justify-center rounded-lg shadow-md cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] "
          onClick={handleClick}
        >
          <h2 className='text-center'>{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}
