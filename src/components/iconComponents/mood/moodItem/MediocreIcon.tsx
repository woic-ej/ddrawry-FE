import React from 'react'
import { IconPropsType } from 'src/types/IconPropsType'

const MediocreIcon:React.FC<IconPropsType> = ({isClick}) => {
  return (
    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.8997 4.85071C10.494 4.85071 4.46973 10.6401 4.46973 17.757C4.46973 24.874 10.494 30.6633 17.8997 30.6633C25.3054 30.6633 31.3296 24.874 31.3296 17.757C31.3296 10.6401 25.3054 4.85071 17.8997 4.85071ZM17.8997 7.00176C24.0944 7.00176 29.0913 11.8038 29.0913 17.757C29.0913 23.7102 24.0944 28.5123 17.8997 28.5123C11.7049 28.5123 6.70805 23.7102 6.70805 17.757C6.70805 11.8038 11.7049 7.00176 17.8997 7.00176ZM12.8634 13.4549C11.9366 13.4549 11.1847 14.1775 11.1847 15.0682C11.1847 15.9589 11.9366 16.6815 12.8634 16.6815C13.7902 16.6815 14.5422 15.9589 14.5422 15.0682C14.5422 14.1775 13.7902 13.4549 12.8634 13.4549ZM22.9359 13.4549C22.0091 13.4549 21.2571 14.1775 21.2571 15.0682C21.2571 15.9589 22.0091 16.6815 22.9359 16.6815C23.8627 16.6815 24.6146 15.9589 24.6146 15.0682C24.6146 14.1775 23.8627 13.4549 22.9359 13.4549ZM12.3039 22.0591V24.2102H23.4955V22.0591H12.3039Z"
        fill={isClick ? "#E7C7E7" : "#000000"}
      />
    </svg>
  );
}

export default MediocreIcon