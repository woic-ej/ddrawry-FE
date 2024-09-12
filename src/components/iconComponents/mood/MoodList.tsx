import React, { Dispatch, SetStateAction } from "react";
import SmileIcon from "@components/iconComponents/mood/moodItem/SmileIcon";
import SadIcon from "@components/iconComponents/mood/moodItem/SadIcon";
import MediocreIcon from "@components/iconComponents/mood/moodItem/MediocreIcon";
import AngryIcon from "@components/iconComponents/mood/moodItem/AngryIcon";
import ExcitedIcon from "@components/iconComponents/mood/moodItem/ExcitedIcon";
import HappyIcon from "@components/iconComponents/mood/moodItem/HappyIcon";

interface MoodListProps {
  selectedMood: string | null;
  setSelectedMood: Dispatch<SetStateAction<string | null>>;
  disabled?: boolean;
}

const MoodList: React.FC<MoodListProps> = ({ selectedMood, setSelectedMood, disabled }) => {
  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };

  return (
    <div className="flex gap-[20px]">
      <button onClick={() => handleMoodClick("smile")} disabled={disabled}>
        <SmileIcon isClick={selectedMood === "smile"} />
      </button>
      <button onClick={() => handleMoodClick("sad")} disabled={disabled}>
        <SadIcon isClick={selectedMood === "sad"} />
      </button>
      <button onClick={() => handleMoodClick("mediocre")} disabled={disabled}>
        <MediocreIcon isClick={selectedMood === "mediocre"} />
      </button>
      <button onClick={() => handleMoodClick("angry")} disabled={disabled}>
        <AngryIcon isClick={selectedMood === "angry"} />
      </button>
      <button onClick={() => handleMoodClick("excited")} disabled={disabled}>
        <ExcitedIcon isClick={selectedMood === "excited"} />
      </button>
      <button onClick={() => handleMoodClick("happy")} disabled={disabled}>
        <HappyIcon isClick={selectedMood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
