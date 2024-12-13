import { useState } from "react";

interface Props {
  defaultValue: string;
  options: { value: string; label: string }[];
  handleOptionChange: (value: string) => void;
}

const SelectBox = ({ defaultValue, options, handleOptionChange }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    handleOptionChange(value);
  };
  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="block min-[320px]:w-4/6 min-[480px]:w-9/12 px-1 py-1 body-font border border-gray-300 rounded-lg shadow-sm focus:outline-none"
    >
      <option value="" disabled>
        선택해주세요
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
