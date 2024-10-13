import React from "react";
import SunnyIcon from "@components/iconComponents/weather/weatherItem/SunnyIcon";
import RainyIcon from "@components/iconComponents/weather/weatherItem/RainyIcon";
import SnowyIcon from "@components/iconComponents/weather/weatherItem/SnowyIcon";
import ThunderStormIcon from "@components/iconComponents/weather/weatherItem/ThunderStormIcon";
import CloudyIcon from "@components/iconComponents/weather/weatherItem/CloudyIcon";
import WindyIcon from "@components/iconComponents/weather/weatherItem/WindyIcon";

interface WeatherListProps {
  setValue: (field: "weather", value: string) => void;
  currentWeather: string;
  disabled?: boolean;
}

const WeatherList: React.FC<WeatherListProps> = ({ disabled, setValue, currentWeather }) => {
  const handleWeatherClick = (weather: string) => {
    setValue("weather", weather);
  };

  return (
    <div className="flex gap-[20px]">
      <button type="button" onClick={() => handleWeatherClick("sunny")} disabled={disabled}>
        <SunnyIcon isClick={currentWeather === "sunny"} />
      </button>
      <button type="button" onClick={() => handleWeatherClick("rainy")} disabled={disabled}>
        <RainyIcon isClick={currentWeather === "rainy"} />
      </button>
      <button type="button" onClick={() => handleWeatherClick("snowy")} disabled={disabled}>
        <SnowyIcon isClick={currentWeather === "snowy"} />
      </button>
      <button type="button" onClick={() => handleWeatherClick("thunderstorm")} disabled={disabled}>
        <ThunderStormIcon isClick={currentWeather === "thunderstorm"} />
      </button>
      <button type="button" onClick={() => handleWeatherClick("cloudy")} disabled={disabled}>
        <CloudyIcon isClick={currentWeather === "cloudy"} />
      </button>
      <button type="button" onClick={() => handleWeatherClick("windy")} disabled={disabled}>
        <WindyIcon isClick={currentWeather === "windy"} />
      </button>
    </div>
  );
};

export default WeatherList;
