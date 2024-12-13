import React from "react";
import SunnyIcon from "@components/iconComponents/weather/weatherItem/SunnyIcon";
import RainyIcon from "@components/iconComponents/weather/weatherItem/RainyIcon";
import SnowyIcon from "@components/iconComponents/weather/weatherItem/SnowyIcon";
import ThunderStormIcon from "@components/iconComponents/weather/weatherItem/ThunderStormIcon";
import CloudyIcon from "@components/iconComponents/weather/weatherItem/CloudyIcon";
import WindyIcon from "@components/iconComponents/weather/weatherItem/WindyIcon";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { UseFormSetValue } from "react-hook-form";

interface WeatherListProps {
  setValue: UseFormSetValue<DiaryFormData>;
  trigger: (field: "weather") => void;
  currentWeather: string;
  disabled?: boolean;
}

const WeatherList: React.FC<WeatherListProps> = ({
  disabled,
  setValue,
  trigger,
  currentWeather,
}) => {
  const handleWeatherClick = (weather: string) => {
    setValue("weather", weather, { shouldDirty: true });
    trigger("weather");
  };

  return (
    <div className="flex gap-[20px]">
      <button
        type="button"
        aria-label="sunny"
        onClick={() => handleWeatherClick("sunny")}
        disabled={disabled}
      >
        <SunnyIcon isClick={currentWeather === "sunny"} />
      </button>
      <button
        type="button"
        aria-label="rainy"
        onClick={() => handleWeatherClick("rainy")}
        disabled={disabled}
      >
        <RainyIcon isClick={currentWeather === "rainy"} />
      </button>
      <button
        type="button"
        aria-label="snowy"
        onClick={() => handleWeatherClick("snowy")}
        disabled={disabled}
      >
        <SnowyIcon isClick={currentWeather === "snowy"} />
      </button>
      <button
        type="button"
        aria-label="thunderstorm"
        onClick={() => handleWeatherClick("thunderstorm")}
        disabled={disabled}
      >
        <ThunderStormIcon isClick={currentWeather === "thunderstorm"} />
      </button>
      <button
        type="button"
        aria-label="cloudy"
        onClick={() => handleWeatherClick("cloudy")}
        disabled={disabled}
      >
        <CloudyIcon isClick={currentWeather === "cloudy"} />
      </button>
      <button
        type="button"
        aria-label="windy"
        onClick={() => handleWeatherClick("windy")}
        disabled={disabled}
      >
        <WindyIcon isClick={currentWeather === "windy"} />
      </button>
    </div>
  );
};

export default WeatherList;
