import React from "react";

interface Props {
  numCols: number;
  numRows: number;
  content: string;
  handleInputChange: (value: string) => void;
}

const InputSection: React.FC<Props> = ({ numCols, numRows, content, handleInputChange }) => {
  const gridCells = Array.from({ length: numCols * numRows });
  return (
    <div className="relative w-full h-full">
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
        }}
      >
        {gridCells.map((_, index) => (
          <div key={index} className="border border-gray-300"></div>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => handleInputChange(e.currentTarget.value)}
        className="w-[105%] h-full pl-[10px] leading-[4rem] title-font tracking-[25px] resize-none outline-none absolute top-0 left-0 "
        style={{
          backgroundColor: "transparent",
          wordSpacing: "20px",
        }}
        rows={numRows}
      />
    </div>
  );
};

export default InputSection;
