import ToggleButton from "@components/buttons/ToggleButton";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import SearchIcon from "@components/search/SearchIcon";
import React, { useEffect } from "react";
import CalenderView from "../components/calender/CalenderView";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
  }, []);

  const handleSearchIconClick = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center">
      <HeaderWithProfile title="띠로리" />
      <div className="flex flex-grow items-center justify-center flex-col py-[2.5rem] gap-[40px] w-11/12 lg:w-4/5">
        <div className="flex justify-between w-full">
          <ToggleButton leftTitle="캘린더형" rightTitle="목록형" />
          <SearchIcon handleClick={handleSearchIconClick} />
        </div>
        <CalenderView />
      </div>
    </div>
  );
};

export default MainPage;
