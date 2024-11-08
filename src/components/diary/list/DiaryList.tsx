import DiaryItem from "@components/diary/list/DiaryItem";
import { BaseDiaryType} from "src/types/diaryTypes";

interface Props {
  diaries: BaseDiaryType[];
}

const DiaryList = ({ diaries }: Props) => {
  return (
    <div className="flex flex-col w-full">
      {diaries.map(({ id, title, image, date, bookmark }) => (
        <DiaryItem key={id} id={id} title={title} image={image} date={date} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default DiaryList;
