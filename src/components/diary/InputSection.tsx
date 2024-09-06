import React, { useState } from "react";

interface Props {
  numCols: number;
  numRows: number;
  gridValues: string[];
  handleInputChange: (index: number, value: string) => void;
  contentLength: number;
}

const InputSection: React.FC<Props> = ({
  numCols,
  numRows,
  gridValues,
  handleInputChange,
  contentLength,
}) => {
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (index: number, event: React.FormEvent<HTMLInputElement>) => {
    setIsComposing(false);

    const value = event.currentTarget.value;
    console.log(value);
    handleInputChange(index, value); // 조합이 끝난 후에만 값을 반영
  };

  const handleChange = (index: number, event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    if (!isComposing) {
      const value = event.currentTarget.value;
      handleInputChange(index, value);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        handleInputChange(index, "");
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }

    if (event.key === " ") {
      if (index < gridValues.length - 1) {
        handleInputChange(index + 1, ""); // 다음 input 값 초기화
        document.getElementById(`input-${index + 1}`)?.focus(); // 다음 input으로 포커스 이동
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="grid w-full h-[600px]"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
        }}
      >
        {gridValues.map((value, index) => (
          <div key={index} className="w-full h-full border border-gray-300">
            <input
              id={`input-${index}`}
              type="text"
              value={value}
              maxLength={1}
              onCompositionStart={handleCompositionStart} // 한글 조합 시작
              onCompositionEnd={(e) => handleCompositionEnd(index, e)} // 한글 조합 끝
              onChange={(e) => handleChange(index, e)} // 조합 중일 때는 값 업데이트 안함
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full h-full text-center border-none outline-none body-font"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-grow justify-end items-center mr-[18px] text-small">
        {contentLength} / 200 자 ( 최소 120자는 써야해요 )
      </div>
    </div>
  );
};

export default InputSection;
