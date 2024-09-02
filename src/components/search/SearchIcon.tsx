import React from "react";

const SearchIcon: React.FC = () => {
  return (
    <button>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 6C10.701 6 6 10.701 6 16.5C6 22.299 10.701 27 16.5 27C22.299 27 27 22.299 27 16.5C27 10.701 22.299 6 16.5 6ZM3 16.5C3 9.04416 9.04416 3 16.5 3C23.9558 3 30 9.04416 30 16.5C30 23.9558 23.9558 30 16.5 30C9.04416 30 3 23.9558 3 16.5Z"
          fill="black"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.9144 23.9143C24.5002 23.3286 25.45 23.3286 26.0358 23.9143L32.5608 30.4393C33.1465 31.0251 33.1465 31.9749 32.5608 32.5607C31.975 33.1465 31.0252 33.1465 30.4394 32.5607L23.9144 26.0357C23.3287 25.4499 23.3287 24.5001 23.9144 23.9143Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default SearchIcon;
