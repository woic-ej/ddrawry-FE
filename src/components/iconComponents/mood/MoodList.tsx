import React from "react";
import SmileIcon from "@components/iconComponents/mood/moodItem/SmileIcon";
import SadIcon from "@components/iconComponents/mood/moodItem/SadIcon";
import MediocreIcon from "@components/iconComponents/mood/moodItem/MediocreIcon";
import AngryIcon from "@components/iconComponents/mood/moodItem/AngryIcon";
import ExcitedIcon from "@components/iconComponents/mood/moodItem/ExcitedIcon";
import HappyIcon from "@components/iconComponents/mood/moodItem/HappyIcon";

interface MoodListProps {
  setValue: (field: "mood", value: string) => void;
  currentMood: string;
  disabled?: boolean;
}

const MoodList: React.FC<MoodListProps> = ({ disabled, setValue, currentMood }) => {
  const handleMoodClick = (mood: string) => {
    setValue("mood", mood);
  };

  return (
    <div className="flex gap-[20px]">
      <button type="button" onClick={() => handleMoodClick("smile")} disabled={disabled}>
        <SmileIcon isClick={currentMood === "smile"} />
      </button>
      <button type="button" onClick={() => handleMoodClick("sad")} disabled={disabled}>
        <SadIcon isClick={currentMood === "sad"} />
      </button>
      <button type="button" onClick={() => handleMoodClick("mediocre")} disabled={disabled}>
        <MediocreIcon isClick={currentMood === "mediocre"} />
      </button>
      <button type="button" onClick={() => handleMoodClick("angry")} disabled={disabled}>
        <AngryIcon isClick={currentMood === "angry"} />
      </button>
      <button type="button" onClick={() => handleMoodClick("excited")} disabled={disabled}>
        <ExcitedIcon isClick={currentMood === "excited"} />
      </button>
      <button type="button" onClick={() => handleMoodClick("happy")} disabled={disabled}>
        <HappyIcon isClick={currentMood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
