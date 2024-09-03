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
}

const MoodList: React.FC<MoodListProps> = ({ selectedMood, setSelectedMood }) => {
  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };
  return (
    <div className="flex gap-[20px]">
      <button onClick={() => handleMoodClick("smile")}>
        <SmileIcon isClick={selectedMood === "smile"} />
      </button>
      <button onClick={() => handleMoodClick("sad")}>
        <SadIcon isClick={selectedMood === "sad"} />
      </button>
      <button onClick={() => handleMoodClick("mediocre")}>
        <MediocreIcon isClick={selectedMood === "mediocre"} />
      </button>
      <button onClick={() => handleMoodClick("angry")}>
        <AngryIcon isClick={selectedMood === "angry"} />
      </button>
      <button onClick={() => handleMoodClick("excited")}>
        <ExcitedIcon isClick={selectedMood === "excited"} />
      </button>
      <button onClick={() => handleMoodClick("happy")}>
        <HappyIcon isClick={selectedMood === "happy"} />
      </button>
    </div>
  );
};

export default MoodList;
