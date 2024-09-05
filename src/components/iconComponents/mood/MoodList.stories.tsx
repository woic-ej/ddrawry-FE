import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MoodList from "@components/iconComponents/mood/MoodList";

function MoodListComponent() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  return (
    <div className="flex gap-[30px]">
      <span className="font-[400] leading-[48.96px] text-[36px] text-black">기분 : </span>
      <MoodList selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
    </div>
  );
}

const meta: Meta<typeof MoodListComponent> = {
  title: "MoodListComponent",
  component: MoodListComponent,
};

export default meta;

type Story = StoryObj<typeof MoodListComponent>;

export const Default: Story = {
  args: {},
};
