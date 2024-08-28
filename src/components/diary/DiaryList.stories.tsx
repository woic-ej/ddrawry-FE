import { Meta, StoryObj } from "@storybook/react";
import DiaryList from "@components/diary/DiaryList";

function DiaryItemList() {
  return <DiaryList />;
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
