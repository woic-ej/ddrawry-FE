import { Meta, StoryObj } from "@storybook/react";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import Calender from "@pages/MainPage/components/calender/Calender";

function CalenderComponents() {
  return (
    <div>
      <DateManipulationBar date={new Date()} />
      <Calender />
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
