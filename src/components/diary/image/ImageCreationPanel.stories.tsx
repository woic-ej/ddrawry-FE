import { Meta, StoryObj } from "@storybook/react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";

function ImageCreationPanelStory() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <ImageCreationPanel images={[]} count={3} isFull={false} isValidate />
      <ImageCreationPanel images={[]} count={3} isFull={false} isValidate={false} />
      <ImageCreationPanel images={[]} count={1} isFull isValidate />
      <ImageCreationPanel images={[]} count={0} isFull isValidate />
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
