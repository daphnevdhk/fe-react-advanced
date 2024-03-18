import React, { useState, useEffect } from "react";

const SpellWords = () => {
  const words = [" Games...", " Sports...", " Relaxation..."]; // replace with your words
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex((prevIndex) => {
        if (prevIndex < words[wordIndex].length - 1) {
          return prevIndex + 1;
        } else {
          setWordIndex((prevWordIndex) => (prevWordIndex + 1) % words.length);
          return 0;
        }
      });
    }, 200); // change letter every second

    return () => clearInterval(interval); // cleanup on unmount
  }, [words, wordIndex]);

  return <div>{words[wordIndex].slice(0, letterIndex + 1)}</div>;
};

export default SpellWords;
