import React, { useState, useEffect } from "react";

export const SpellWords = ({ categories }) => {
  const words =
    categories.length > 0
      ? categories.map((c) => " " + c.name + "...")
      : [" Games..."];

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
    }, 200);

    return () => clearInterval(interval); // cleanup on unmount
  }, [words, wordIndex]);

  return <div>{words[wordIndex].slice(0, letterIndex + 1)}</div>;
};
