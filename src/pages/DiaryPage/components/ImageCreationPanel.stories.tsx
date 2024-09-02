import { Meta, StoryObj } from "@storybook/react";
import ImageCreationPanel from "@pages/DiaryPage/components/ImageCreationPanel";

function ImageCreationPanelStory() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <ImageCreationPanel count={3} isFull={false} isValidate />
      <ImageCreationPanel count={3} isFull={false} isValidate={false} />
      <ImageCreationPanel count={1} isFull isValidate />
      <ImageCreationPanel count={0} isFull isValidate />
    </div>
  );
}

const meta: Meta<typeof ImageCreationPanelStory> = {
  title: "ImageCreationPanelStory",
  component: ImageCreationPanelStory,
};

export default meta;

type Story = StoryObj<typeof ImageCreationPanelStory>;

export const Default: Story = {
  args: {},
};
