import React, { Dispatch, SetStateAction } from "react";
import SunnyIcon from "@components/iconComponents/weather/weatherItem/SunnyIcon";
import RainyIcon from "@components/iconComponents/weather/weatherItem/RainyIcon";
import SnowyIcon from "@components/iconComponents/weather/weatherItem/SnowyIcon";
import ThunderStormIcon from "@components/iconComponents/weather/weatherItem/ThunderStormIcon";
import CloudyIcon from "@components/iconComponents/weather/weatherItem/CloudyIcon";
import WindyIcon from "@components/iconComponents/weather/weatherItem/WindyIcon";

interface WeatherListProps {
  selectedWeather: string | null;
  setSelectedWeather: Dispatch<SetStateAction<string | null>>;
}

const WeatherList: React.FC<WeatherListProps> = ({ selectedWeather, setSelectedWeather }) => {
  const handleWeatherClick = (weather: string) => {
    setSelectedWeather(weather);
  };
  return (
    <div className="flex gap-[20px]">
      <button onClick={() => handleWeatherClick("sunny")}>
        <SunnyIcon isClick={selectedWeather === "sunny"} />
      </button>
      <button onClick={() => handleWeatherClick("rainy")}>
        <RainyIcon isClick={selectedWeather === "rainy"} />
      </button>
      <button onClick={() => handleWeatherClick("snowy")}>
        <SnowyIcon isClick={selectedWeather === "snowy"} />
      </button>
      <button onClick={() => handleWeatherClick("thunderstorm")}>
        <ThunderStormIcon isClick={selectedWeather === "thunderstorm"} />
      </button>
      <button onClick={() => handleWeatherClick("cloudy")}>
        <CloudyIcon isClick={selectedWeather === "cloudy"} />
      </button>
      <button onClick={() => handleWeatherClick("windy")}>
        <WindyIcon isClick={selectedWeather === "windy"} />
      </button>
    </div>
  );
};

export default WeatherList;
