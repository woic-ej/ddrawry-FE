import React from "react";
import SunnyIcon from "@components/iconComponents/weather/weatherItem/SunnyIcon";
import RainyIcon from "@components/iconComponents/weather/weatherItem/RainyIcon";
import SnowyIcon from "@components/iconComponents/weather/weatherItem/SnowyIcon";
import ThunderStormIcon from "@components/iconComponents/weather/weatherItem/ThunderStormIcon";
import CloudyIcon from "@components/iconComponents/weather/weatherItem/CloudyIcon";
import WindyIcon from "@components/iconComponents/weather/weatherItem/WindyIcon";
import useDiaryStore from "@store/diaryStore";

interface WeatherListProps {
  disabled?: boolean;
}

const WeatherList: React.FC<WeatherListProps> = ({ disabled }) => {
  const { weather, setWeather } = useDiaryStore();
  const handleWeatherClick = (weather: string) => {
    setWeather(weather);
  };

  return (
    <div className="flex gap-[20px]">
      <button onClick={() => handleWeatherClick("sunny")} disabled={disabled}>
        <SunnyIcon isClick={weather === "sunny"} />
      </button>
      <button onClick={() => handleWeatherClick("rainy")} disabled={disabled}>
        <RainyIcon isClick={weather === "rainy"} />
      </button>
      <button onClick={() => handleWeatherClick("snowy")} disabled={disabled}>
        <SnowyIcon isClick={weather === "snowy"} />
      </button>
      <button onClick={() => handleWeatherClick("thunderstorm")} disabled={disabled}>
        <ThunderStormIcon isClick={weather === "thunderstorm"} />
      </button>
      <button onClick={() => handleWeatherClick("cloudy")} disabled={disabled}>
        <CloudyIcon isClick={weather === "cloudy"} />
      </button>
      <button onClick={() => handleWeatherClick("windy")} disabled={disabled}>
        <WindyIcon isClick={weather === "windy"} />
      </button>
    </div>
  );
};

export default WeatherList;
