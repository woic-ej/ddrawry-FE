import React from "react";

interface Props {
  onClick?: () => void;
}

const RightArrowIcon: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.4156 8.22382C14.002 7.62608 14.9527 7.62608 15.5391 8.22382L24.5482 17.4075C25.1346 18.0052 25.1346 18.9744 24.5482 19.5721L15.5391 28.7558C14.9527 29.3535 14.002 29.3535 13.4156 28.7558C12.8292 28.158 12.8292 27.1889 13.4156 26.5912L21.363 18.4898L13.4156 10.3884C12.8292 9.79069 12.8292 8.82156 13.4156 8.22382Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default RightArrowIcon;
