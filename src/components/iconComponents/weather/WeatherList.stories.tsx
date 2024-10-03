import { Meta, StoryObj } from "@storybook/react";
import WeatherList from "@components/iconComponents/weather/WeatherList";

function WeatherListComponent() {
  return (
    <div className="flex gap-[30px]">
      <span className="leading-[48.96px] text-[36px] text-black">날씨 : </span>
      <WeatherList />
    </div>
  );
}

const meta: Meta<typeof WeatherListComponent> = {
  title: "WeatherListComponent",
  component: WeatherListComponent,
};

export default meta;

type Story = StoryObj<typeof WeatherListComponent>;

export const Default: Story = {
  args: {},
};
