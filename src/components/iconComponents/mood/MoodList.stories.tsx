import { Meta, StoryObj } from "@storybook/react";
import MoodList from "@components/iconComponents/mood/MoodList";

function MoodListComponent() {
  return (
    <div className="flex gap-[30px]">
      <span className="leading-[48.96px] text-[36px] text-black">기분 : </span>
      <MoodList />
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
