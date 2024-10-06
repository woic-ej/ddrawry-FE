import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import ToggleButton from "@components/buttons/ToggleButton";
import DiaryList from "@components/diary/list/DiaryList";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import { useDateControl } from "@hooks/useDateControl";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import { useToggleStore } from "@store/useToggleStore";
import React, { useEffect, useState } from "react";
import { DiaryListType } from "src/types/diaryTypes";
import EmptyState from "@components/empty/EmptyState";

const LikedPage: React.FC = () => {
  const [likedDiaries, setLikedDiaries] = useState<DiaryListType[]>([]);
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const { isTotalView } = useToggleStore();

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: DiaryListType[] } = await api.get({
          endpoint: apiRoutes.likeDiary,
        });
        setLikedDiaries(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <HeaderWithProfile title="좋아요한 일기들" />
      {likedDiaries?.length === 0 ? (
        <div className="w-full h-full">
          <EmptyState message="좋아요한 일기가 없어요! 소중한 일기들을 하나씩 모아봐요" />
        </div>
      ) : (
        <div className="flex flex-grow items-center flex-col gap-[48px] px-[130px] py-[53px]">
          <div className="flex justify-start w-full min-w-[990px]">
            <ToggleButton leftTitle="전체보기" rightTitle="날짜별" />
          </div>
          <div className="w-full min-w-[990px] flex flex-col items-center gap-[64px]">
            {!isTotalView && (
              <DateManipulationBar
                date={currentDate}
                prevMonthHandler={prevMonthHandler}
                nextMonthHandler={nextMonthHandler}
              />
            )}
            <DiaryList diaries={likedDiaries!} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedPage;
