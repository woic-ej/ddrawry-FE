import React, { useEffect, useState } from "react";

interface Props {
  content?: string;
}

const DisplaySection: React.FC<Props> = ({ content = "" }) => {
  const COLS_MAP = {
    base: 12,
    sm: 20,
  };

  const ROWS_MAP = {
    base: 20,
    sm: 12,
  };

  const [grid, setGrid] = useState<string[]>([]);
  const [rows, setRows] = useState(ROWS_MAP.base);
  const [cols, setCols] = useState(COLS_MAP.base);

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;

      if (width >= 640) {
        setCols(COLS_MAP.sm);
        setRows(ROWS_MAP.sm);
      } else {
        setCols(COLS_MAP.base);
        setRows(ROWS_MAP.base);
      }

      const paddedContent = (content || "").padEnd(rows * cols, " ");

      setGrid(Array.from(paddedContent));
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);

    return () => window.removeEventListener("resize", updateGrid);
  }, [content]);

  return (
    <div
      className="grid gap-0 w-full flex-grow"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {grid.map((word, index) => (
        <div
          key={`${word}-${index}`}
          className="border border-gray-300 w-full aspect-square flex items-center justify-center body-font text-black"
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default DisplaySection;
