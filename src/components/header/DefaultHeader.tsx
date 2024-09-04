import React from "react";

interface DefaultHeaderProps {
  title: "띠로리" | "일기 쓰기";
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title }) => {
  return (
    <>
      <div
        className={`fixed top-0 flex w-full p-0 h-[82px] justify-center items-center ${
          title === "일기 쓰기" ? "bg-Highlight" : "bg-Primary"
        }`}
      >
        <p className="text-center font-[400] title-font leading-[48.96px]">{title}</p>
      </div>
      {/* 헤더 높이만큼의 공간 확보 */}
      <div className="h-[82px]" />
    </>
  );
};

export default DefaultHeader;
