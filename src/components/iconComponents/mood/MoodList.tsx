import React from "react";
import SmileIcon from "@components/iconComponents/mood/moodItem/SmileIcon";
import SadIcon from "@components/iconComponents/mood/moodItem/SadIcon";
import MediocreIcon from "@components/iconComponents/mood/moodItem/MediocreIcon";
import AngryIcon from "@components/iconComponents/mood/moodItem/AngryIcon";
import ExcitedIcon from "@components/iconComponents/mood/moodItem/ExcitedIcon";
import HappyIcon from "@components/iconComponents/mood/moodItem/HappyIcon";
import useDiaryStore from "@store/diaryStore";

interface MoodListProps {
  disabled?: boolean;
}

const MoodList: React.FC<MoodListProps> = ({ disabled }) => {
  const { mood, setMood } = useDiaryStore();
  const handleMoodClick = (mood: string) => {
    setMood(mood);
  };

  return (
    <div className="flex gap-[20px]">
      <button onClick={() => handleMoodClick("smile")} disabled={disabled}>
        <SmileIcon isClick={mood === "smile"} />
      </button>
      <button onClick={() => handleMoodClick("sad")} disabled={disabled}>
        <SadIcon isClick={mood === "sad"} />
      </button>
      <button onClick={() => handleMoodClick("mediocre")} disabled={disabled}>
        <MediocreIcon isClick={mood === "mediocre"} />
      </button>
      <button onClick={() => handleMoodClick("angry")} disabled={disabled}>
        <AngryIcon isClick={mood === "angry"} />
      </button>
      <button onClick={() => handleMoodClick("excited")} disabled={disabled}>
        <ExcitedIcon isClick={mood === "excited"} />
      </button>
      <button onClick={() => handleMoodClick("happy")} disabled={disabled}>
        <HappyIcon isClick={mood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
