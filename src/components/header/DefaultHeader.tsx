import React from "react";

interface DefaultHeaderProps {
  title: "띠로리" | "일기 쓰기";
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title }) => {
  return (
      <div
        className={`z-[50] sticky top-0 flex w-full p-0 h-[82px] justify-center items-center ${
          title === "일기 쓰기" ? "bg-Highlight" : "bg-Primary"
        }`}
      >
        <p className="text-center title-font leading-[48.96px]">{title}</p>
      </div>
  );
};

export default DefaultHeader;
