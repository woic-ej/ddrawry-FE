import React, { useEffect, useState } from "react";

interface Props {
  content: string;
}

const COLS = 24;
const ROWS = 15;

const DisplaySection: React.FC<Props> = ({ content }) => {
  const initializeGrid = () => Array(COLS * ROWS).fill("");
  const [grid, setGrid] = useState<string[]>(initializeGrid);

  useEffect(() => {
    if (content) {
      const paddedContent = content.padEnd(COLS * ROWS, " ");
      setGrid(Array.from(paddedContent));
    }
  }, [content]);

  return (
    <div
      className="grid gap-0 w-full flex-grow"
      style={{
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      }}
    >
      {grid.map((word) => (
        <div className="border border-gray-300 flex items-center justify-center text-black text-regular">
          {word}
        </div>
      ))}
    </div>
  );
};

export default DisplaySection;
