import { Meta, StoryObj } from "@storybook/react";
import Diary from "@components/diary/Diary";

function DiaryComponent() {
  return <Diary date="2024년 8월 10일" name="최은진" count={3} isFull={false} />;
}

const meta: Meta<typeof DiaryComponent> = {
  title: "DiaryComponent",
  component: DiaryComponent,
};

export default meta;

type Story = StoryObj<typeof DiaryComponent>;

export const Default: Story = {
  args: {},
};
