import { Meta, StoryObj } from "@storybook/react";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import { useState } from "react";

function WeatherListComponent() {
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  return (
    <div className="flex gap-[30px]">
      <span className="font-[400] leading-[48.96px] text-[36px] text-black">날씨 : </span>
      <WeatherList selectedWeather={selectedWeather} setSelectedWeather={setSelectedWeather} />
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
