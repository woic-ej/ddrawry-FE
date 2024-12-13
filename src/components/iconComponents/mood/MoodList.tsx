import React from "react";
import SmileIcon from "@components/iconComponents/mood/moodItem/SmileIcon";
import SadIcon from "@components/iconComponents/mood/moodItem/SadIcon";
import MediocreIcon from "@components/iconComponents/mood/moodItem/MediocreIcon";
import AngryIcon from "@components/iconComponents/mood/moodItem/AngryIcon";
import ExcitedIcon from "@components/iconComponents/mood/moodItem/ExcitedIcon";
import HappyIcon from "@components/iconComponents/mood/moodItem/HappyIcon";
import { UseFormSetValue } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

interface MoodListProps {
  setValue: UseFormSetValue<DiaryFormData>;
  trigger: (field: "mood") => void;
  currentMood: string;
  disabled?: boolean;
}

const MoodList: React.FC<MoodListProps> = ({ disabled, setValue, trigger, currentMood }) => {
  const handleMoodClick = (mood: string) => {
    setValue("mood", mood, { shouldDirty: true });
    trigger("mood");
  };

  return (
    <div className="flex gap-[15px]">
      <button
        type="button"
        aria-label="smile"
        onClick={() => handleMoodClick("smile")}
        disabled={disabled}
      >
        <SmileIcon isClick={currentMood === "smile"} />
      </button>
      <button
        type="button"
        aria-label="sad"
        onClick={() => handleMoodClick("sad")}
        disabled={disabled}
      >
        <SadIcon isClick={currentMood === "sad"} />
      </button>
      <button
        type="button"
        aria-label="mediocre"
        onClick={() => handleMoodClick("mediocre")}
        disabled={disabled}
      >
        <MediocreIcon isClick={currentMood === "mediocre"} />
      </button>
      <button
        type="button"
        aria-label="angry"
        onClick={() => handleMoodClick("angry")}
        disabled={disabled}
      >
        <AngryIcon isClick={currentMood === "angry"} />
      </button>
      <button
        type="button"
        aria-label="excited"
        onClick={() => handleMoodClick("excited")}
        disabled={disabled}
      >
        <ExcitedIcon isClick={currentMood === "excited"} />
      </button>
      <button
        type="button"
        aria-label="happy"
        onClick={() => handleMoodClick("happy")}
        disabled={disabled}
      >
        <HappyIcon isClick={currentMood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
