import React, { useEffect, useState } from "react";

interface Props {
  content: string;
  wordLimit: number;
  maxLength: number;
  onChange: (value: string) => void;
}

const InputSection: React.FC<Props> = ({ content, wordLimit, maxLength, onChange }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    document.getElementById("textarea")?.focus();
  }, [isClicked]);

  return (
    <div
      className={`w-full flex flex-grow ${!isClicked && " justify-center items-center cursor-pointer"}`}
      onClick={() => {
        setIsClicked(true);
      }}
    >
      {content.length === 0 && !isClicked ? (
        <div className="hugeCaption-font text-center">
          띠로리가 멋진 그림을 만들기위해서는 <br />
          최소 {wordLimit}자는 써야 해요!
        </div>
      ) : (
        <div className="w-full h-full flex flex-col ">
          <textarea
            id="textarea"
            className="resize-none outline-none title-font w-full flex-grow p-10"
            value={content}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="w-full flex justify-end items-center h-[50px] pr-[18px] text-Gray text-[22px]">
            {content.length} / {maxLength} 자
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSection;
