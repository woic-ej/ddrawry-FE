import { useState, useEffect } from "react";
import LoadingWord1 from "@components/loading/LoadingWord1";
import LoadingWord2 from "@components/loading/LoadingWord2";
import LoadingWord3 from "@components/loading/LoadingWord3";

const LoadingAnimation = () => {
  const [activeWord, setActiveWord] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev % 3) + 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6">
      <span className={`transition-transform duration-500 ${activeWord === 1 && "animate-bounce"}`}>
        <LoadingWord1 />
      </span>
      <span className={`transition-transform duration-500 ${activeWord === 2 && "animate-bounce"}`}>
        <LoadingWord2 />
      </span>
      <span className={`transition-transform duration-500 ${activeWord === 3 && "animate-bounce"}`}>
        <LoadingWord3 />
      </span>
    </div>
  );
};

export default LoadingAnimation;
