import ToggleButton from "@components/buttons/ToggleButton";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import SearchIcon from "@components/search/SearchIcon";
import React, { useEffect } from "react";
import CalenderView from "../components/calender/CalenderView";
import { useDateStore } from "@store/useDateStore";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const { clearCurrentDate } = useDateStore();
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
    clearCurrentDate();
  }, []);

  const handleSearchIconClick = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <HeaderWithProfile title="띠로리" />
      <div className="flex flex-grow items-center flex-col gap-[48px] px-[130px] py-[53px]">
        <div className="flex justify-between w-full min-w-[990px]">
          <ToggleButton leftTitle="캘린더형" rightTitle="목록형" />
          <SearchIcon handleClick={handleSearchIconClick} />
        </div>
        <CalenderView />
      </div>
    </div>
  );
};

export default MainPage;
