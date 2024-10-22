import { Meta, StoryObj } from "@storybook/react";
import CalenderView from "@pages/MainPage/components/calender/CalenderView";

function CalenderComponents() {
  return (
    <div>
      <CalenderView />
    </div>
  );
}

const meta: Meta<typeof CalenderComponents> = {
  title: "CalenderComponents",
  component: CalenderComponents,
};

export default meta;

type Story = StoryObj<typeof CalenderComponents>;

export const Default: Story = {
  args: {},
};
