import SmileIcon from "@components/diary/mood/moodItem/SmileIcon";
import SadIcon from "@components/diary/mood/moodItem/SadIcon";
import MediocreIcon from "@components/diary/mood/moodItem/MediocreIcon";
import AngryIcon from "@components/diary/mood/moodItem/AngryIcon";
import ExcitedIcon from "@components/diary/mood/moodItem/ExcitedIcon";
import HappyIcon from "@components/diary/mood/moodItem/HappyIcon";
import { UseFormSetValue } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import SelectBox from "@components/diary/SelectBox";

interface MoodListProps {
  setValue: UseFormSetValue<DiaryFormData>;
  trigger: (field: "mood") => void;
  currentMood: string;
  isDiaryPage?: boolean;
  isSelectOption?: boolean;
}

const MoodList = ({
  isDiaryPage,
  setValue,
  trigger,
  currentMood,
  isSelectOption,
}: MoodListProps) => {
  const moods = [
    { value: "smile", label: "좋음" },
    { value: "sad", label: "슬픔" },
    { value: "mediocre", label: "그저그럼" },
    { value: "angry", label: "화남" },
    { value: "excited", label: "신남" },
    { value: "happy", label: "행복함" },
  ];

  const handleMoodChange = (mood: string) => {
    setValue("mood", mood, { shouldDirty: true });
    trigger("mood");
  };

  const currentLabel = moods.find((mood) => mood.value === currentMood)?.label;

  return isSelectOption ? (
    isDiaryPage ? (
      <div className="flex justify-center flex-grow">{currentLabel}</div>
    ) : (
      <SelectBox defaultValue={currentMood} options={moods} handleOptionChange={handleMoodChange} />
    )
  ) : (
    <div className="iconList-style">
      <button
        type="button"
        aria-label="smile"
        onClick={() => handleMoodChange("smile")}
        disabled={isDiaryPage}
      >
        <SmileIcon isClick={currentMood === "smile"} />
      </button>
      <button
        type="button"
        aria-label="sad"
        onClick={() => handleMoodChange("sad")}
        disabled={isDiaryPage}
      >
        <SadIcon isClick={currentMood === "sad"} />
      </button>
      <button
        type="button"
        aria-label="mediocre"
        onClick={() => handleMoodChange("mediocre")}
        disabled={isDiaryPage}
      >
        <MediocreIcon isClick={currentMood === "mediocre"} />
      </button>
      <button
        type="button"
        aria-label="angry"
        onClick={() => handleMoodChange("angry")}
        disabled={isDiaryPage}
      >
        <AngryIcon isClick={currentMood === "angry"} />
      </button>
      <button
        type="button"
        aria-label="excited"
        onClick={() => handleMoodChange("excited")}
        disabled={isDiaryPage}
      >
        <ExcitedIcon isClick={currentMood === "excited"} />
      </button>
      <button
        type="button"
        aria-label="happy"
        onClick={() => handleMoodChange("happy")}
        disabled={isDiaryPage}
      >
        <HappyIcon isClick={currentMood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
