import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

interface Props {
  wordLimit: number;
  maxLength: number;
  register: UseFormRegister<DiaryFormData>;
  currentStory: string;
}

const InputSection: React.FC<Props> = ({ wordLimit, maxLength, register, currentStory = "" }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    document.getElementById("textarea")?.focus();
  }, [isClicked]);

  return (
    <div
      className={`w-full flex h-[300px] ${!isClicked && " justify-center items-center cursor-pointer"}`}
      onClick={() => {
        setIsClicked(true);
      }}
    >
      {currentStory.length === 0 && !isClicked ? (
        <div className="hugeCaption-font text-center">
          띠로리가 멋진 그림을 만들기위해서는 <br />
          최소 {wordLimit}자는 써야 해요!
        </div>
      ) : (
        <div className="w-full h-full flex flex-col ">
          <textarea
            id="textarea"
            className="resize-none outline-none title-font w-full flex-grow p-6 pb-0 md:p-10 md:pb-0"
            maxLength={maxLength}
            {...register("story")}
          />
          <div className="w-full flex justify-end items-center h-[50px] pr-[18px] hugeCaption-font">
            {currentStory.length} / {maxLength} 자
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSection;
