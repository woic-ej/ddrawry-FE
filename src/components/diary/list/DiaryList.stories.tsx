import { Meta, StoryObj } from "@storybook/react";
import DiaryList from "@components/diary/list/DiaryList";

function DiaryItemList() {
  return <DiaryList diaries={[]} />;
}

const meta: Meta<typeof DiaryItemList> = {
  title: "DiaryItemList",
  component: DiaryItemList,
};

export default meta;

type Story = StoryObj<typeof DiaryItemList>;

export const Default: Story = {
  args: {},
};
