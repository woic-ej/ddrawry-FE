import { Meta, StoryObj } from "@storybook/react";
import Diary from "@components/diary/Diary";

function DiaryComponent() {
  return <Diary date="2024년 8월 10일" nickname="최은진" />;
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
