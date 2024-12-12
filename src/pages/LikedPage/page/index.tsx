import ToggleButton from "@components/buttons/ToggleButton";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import { useDateControl } from "@hooks/useDateControl";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import { useToggleStore } from "@store/useToggleStore";
import { useLikedDiaries } from "@api/liked/useLikedDiaries";
import { format } from "date-fns";
import EmptyState from "@components/empty/EmptyState";
import DiaryList from "@components/diary/list/DiaryList";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const LikedPage = () => {
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const { isTotalView } = useToggleStore();
  const { data: likedDiaries, isLoading } = useLikedDiaries(
    isTotalView,
    format(currentDate, "yyyyMM"),
  );

  return (
    <div className="flex flex-col min-h-screen w-full items-center">
      <HeaderWithProfile title="좋아요한 일기들" />
      <div className="flex flex-grow items-center flex-col w-11/12 md:w-4/5 pt-[2.3rem]">
        <div className="flex justify-start w-full">
          <ToggleButton leftTitle="전체보기" rightTitle="날짜별" />
        </div>
        <div className="w-full flex-grow flex flex-col items-center gap-[30px] md:gap-[50px] my-[25px] md:my-[40px]">
          {!isTotalView && (
            <DateManipulationBar
              date={currentDate}
              prevMonthHandler={prevMonthHandler}
              nextMonthHandler={nextMonthHandler}
            />
          )}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            likedDiaries &&
            (likedDiaries.length === 0 ? (
              <div className="w-full flex-grow flex justify-center items-center">
                <EmptyState
                  message="좋아요한 일기가 없어요! 
                소중한 일기들을 하나씩 모아봐요"
                />
              </div>
            ) : (
              <DiaryList diaries={likedDiaries!} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedPage;
