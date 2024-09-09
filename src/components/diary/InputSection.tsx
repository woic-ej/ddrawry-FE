import React, { useEffect, useState } from "react";
import TypingEffect from "./TypingEffect";

interface Props {
  content: string;
  handleInputChange: (value: string) => void;
}

const InputSection: React.FC<Props> = ({ content, handleInputChange }) => {
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const handleClick = () => {
    setIsFocus(true);
    document.getElementById("input")?.focus();
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  useEffect(() => {
    document.getElementById("input")?.focus();
  }, []);

  return (
    <div className="flex flex-grow" onClick={handleClick} onBlur={handleBlur}>
      <input
        id="input"
        type="text"
        value={content}
        onChange={(e) => handleInputChange(e.target.value)}
        className="opacity-0 absolute left-[-9999px]"
      />
      <TypingEffect content={content} isFocus={isFocus} />
    </div>
  );
};

export default InputSection;
