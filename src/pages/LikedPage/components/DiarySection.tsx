import DiaryList from "@components/diary/list/DiaryList";
import EmptyState from "@components/empty/EmptyState";
import { DiaryListType } from "src/types/diaryTypes";

interface Props {
  likedDiaries: DiaryListType[];
  isError: boolean;
  error: Error | null;
}

const DiarySection = ({ likedDiaries, isError, error }: Props) => {
  if (isError && error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <EmptyState message={"예상하지 못한 오류가 발생했어요. 다시 시도해주세요."} />
      </div>
    );
  }

  if (likedDiaries) {
    if (likedDiaries.length === 0) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <EmptyState message="좋아요한 일기가 없어요! 소중한 일기들을 하나씩 모아봐요" />
        </div>
      );
    } else {
      return <DiaryList diaries={likedDiaries!} />;
    }
  }
};

export default DiarySection;
