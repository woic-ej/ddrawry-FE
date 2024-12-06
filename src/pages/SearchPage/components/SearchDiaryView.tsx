import DiaryList from "@components/diary/list/DiaryList";
import EmptyState from "@components/empty/EmptyState";
import { DiaryListType } from "src/types/diaryTypes";

interface Props {
  value: string;
  data: DiaryListType[] | undefined;
}

const SearchDiaryView = ({ value, data }: Props) => {
  if (!value || !data)
    return (
      <div className="flex flex-grow justify-center items-center">
        <EmptyState message="검색어를 입력해주세요!" />
      </div>
    );

  if (data) {
    return data.length === 0 ? (
      <div className="flex flex-grow justify-center items-center">
        <EmptyState message={`${value}(으)로 검색된 결과가 없어요!`} />
      </div>
    ) : (
      <div className="w-2/3 flex justify-center items-center mt-[60px]">
        <DiaryList diaries={data} />
      </div>
    );
  }
};

export default SearchDiaryView;
