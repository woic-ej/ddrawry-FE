import React from "react";

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
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
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
