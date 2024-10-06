import DiaryItem from "@components/diary/list/DiaryItem";
import { DiaryListType } from "src/types/diaryTypes";

interface Props {
  likedDiaries: DiaryListType[];
}

const DiaryList = ({ likedDiaries }: Props) => {
  return (
    <div className="flex flex-col w-full">
      {likedDiaries.map(({ id, title, image, date, bookmark }) => (
        <DiaryItem key={id} title={title} image={image} date={date} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default DiaryList;
