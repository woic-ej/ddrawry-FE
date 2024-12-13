import React from "react";

interface Props {
  onClick?: () => void;
}

const LeftArrowIcon: React.FC<Props> = ({ onClick }) => {
  return (
    <button aria-label="leftArrow" onClick={onClick}>
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.5846 8.22382C24.1709 8.82156 24.1709 9.79069 23.5846 10.3884L15.6372 18.4898L23.5846 26.5912C24.1709 27.1889 24.1709 28.158 23.5846 28.7558C22.9982 29.3535 22.0475 29.3535 21.4611 28.7558L12.452 19.5721C11.8656 18.9744 11.8656 18.0052 12.452 17.4075L21.4611 8.22382C22.0475 7.62608 22.9982 7.62608 23.5846 8.22382Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default LeftArrowIcon;
