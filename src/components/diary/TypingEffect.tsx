import { useCursorIndex } from "@store/CursorIndex";
import { useEffect, useState } from "react";

interface Props {
  content: string;
  isFocus: boolean;
}

const COLS = 20;
const ROWS = 12;
const totalCells = COLS * ROWS;

const TypingEffect: React.FC<Props> = ({ content, isFocus }) => {
  const initializeGrid = () => Array(totalCells).fill("");
  const [grid, setGrid] = useState<string[]>(initializeGrid);
  const { cursorIndex, setCursorIndex } = useCursorIndex();

  const handleClick = (index: number) => {
    setCursorIndex(index);
  };

  useEffect(() => {
    const paddedContent = content.padEnd(totalCells, " ");
    setGrid(Array.from(paddedContent));

    if (!isFocus) {
      setCursorIndex(null);
    }
  }, [content, isFocus, setCursorIndex]);

  return (
    <div className="w-full flex flex-col">
      <div
        className="grid gap-0 w-full flex-grow"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {grid.map((value, index) => (
          <div
            key={index}
            className={`border border-gray-300 flex items-center justify-center text-black text-regular `}
            onClick={() => handleClick(index)}
          >
            {value}
            {cursorIndex === index && <div className="w-[1px] h-[80%] bg-black animate-blink" />}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end items-center h-[40px] pr-3">
        {content.length} 자 / {totalCells} 자
      </div>
    </div>
  );
};

export default TypingEffect;
