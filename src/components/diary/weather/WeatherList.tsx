import React from "react";
import SunnyIcon from "@components/diary/weather/weatherItem/SunnyIcon";
import RainyIcon from "@components/diary/weather/weatherItem/RainyIcon";
import SnowyIcon from "@components/diary/weather/weatherItem/SnowyIcon";
import ThunderStormIcon from "@components/diary/weather/weatherItem/ThunderStormIcon";
import CloudyIcon from "@components/diary/weather/weatherItem/CloudyIcon";
import WindyIcon from "@components/diary/weather/weatherItem/WindyIcon";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { UseFormSetValue } from "react-hook-form";
import SelectBox from "@components/diary/SelectBox";

interface WeatherListProps {
  setValue: UseFormSetValue<DiaryFormData>;
  trigger: (field: "weather") => void;
  currentWeather: string;
  isDiaryPage?: boolean;
  isSelectOption?: boolean;
}

const WeatherList: React.FC<WeatherListProps> = ({
  isDiaryPage,
  setValue,
  trigger,
  currentWeather,
  isSelectOption,
}) => {
  const weathers = [
    { value: "sunny", label: "맑음", Icon: SunnyIcon },
    { value: "rainy", label: "비", Icon: RainyIcon },
    { value: "snowy", label: "눈", Icon: SnowyIcon },
    { value: "thunderstorm", label: "천둥", Icon: ThunderStormIcon },
    { value: "cloudy", label: "구름", Icon: CloudyIcon },
    { value: "windy", label: "바람", Icon: WindyIcon },
  ];

  const handleWeatherChange = (weather: string) => {
    setValue("weather", weather, { shouldDirty: true });
    trigger("weather");
  };

  const currentLabel = weathers.find((weather) => weather.value === currentWeather)?.label;

  return isSelectOption ? (
    isDiaryPage ? (
      <div className="flex justify-center flex-grow">{currentLabel}</div>
    ) : (
      <SelectBox
        defaultValue={currentWeather}
        options={weathers}
        handleOptionChange={handleWeatherChange}
      />
    )
  ) : (
    <div className="iconList-style">
      <button
        type="button"
        aria-label="sunny"
        onClick={() => handleWeatherChange("sunny")}
        disabled={isDiaryPage}
      >
        <SunnyIcon isClick={currentWeather === "sunny"} />
      </button>
      <button
        type="button"
        aria-label="rainy"
        onClick={() => handleWeatherChange("rainy")}
        disabled={isDiaryPage}
      >
        <RainyIcon isClick={currentWeather === "rainy"} />
      </button>
      <button
        type="button"
        aria-label="snowy"
        onClick={() => handleWeatherChange("snowy")}
        disabled={isDiaryPage}
      >
        <SnowyIcon isClick={currentWeather === "snowy"} />
      </button>
      <button
        type="button"
        aria-label="thunderstorm"
        onClick={() => handleWeatherChange("thunderstorm")}
        disabled={isDiaryPage}
      >
        <ThunderStormIcon isClick={currentWeather === "thunderstorm"} />
      </button>
      <button
        type="button"
        aria-label="cloudy"
        onClick={() => handleWeatherChange("cloudy")}
        disabled={isDiaryPage}
      >
        <CloudyIcon isClick={currentWeather === "cloudy"} />
      </button>
      <button
        type="button"
        aria-label="windy"
        onClick={() => handleWeatherChange("windy")}
        disabled={isDiaryPage}
      >
        <WindyIcon isClick={currentWeather === "windy"} />
      </button>
    </div>
  );
};

export default WeatherList;
