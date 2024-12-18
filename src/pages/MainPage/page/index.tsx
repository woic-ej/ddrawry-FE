import ToggleButton from "@components/buttons/ToggleButton";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import SearchIcon from "@components/search/SearchIcon";
import React, { useEffect, useState } from "react";
import CalenderView from "../components/calender/CalenderView";
import { useNavigate } from "react-router-dom";
import InformationModal from "@components/modals/InformationModal";
import ModalLayout from "@components/modals/ModalLayout";
import { useCookies } from "react-cookie";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["hideForOneDay", "hideForever"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearchIconClick = () => {
    navigate("/search");
  };

  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
  }, []);

  useEffect(() => {
    const isHideForOneDay = !cookies.hideForOneDay;
    const isHideForever = !cookies.hideForever;
    setIsModalOpen(isHideForOneDay && isHideForever);
  }, [cookies]);

  return (
    <div className="flex flex-col min-h-screen w-full items-center">
      <HeaderWithProfile title="띠로리" />
      <div className="flex flex-grow items-center justify-center flex-col py-[2.3rem] gap-[30px] md:gap-[40px] w-11/12 md:w-4/5">
        <div className="flex justify-between w-full">
          <ToggleButton leftTitle="캘린더형" rightTitle="목록형" />
          <SearchIcon handleClick={handleSearchIconClick} />
        </div>
        <CalenderView />
      </div>

      {isModalOpen && (
        <ModalLayout modalClose={() => setIsModalOpen(false)}>
          <InformationModal InformationModalClose={() => setIsModalOpen(false)} isMainPage />
        </ModalLayout>
      )}
    </div>
  );
};

export default MainPage;
