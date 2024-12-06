import React from "react";
import { IconPropsType } from "src/types/IconPropsType";

const RainyIcon: React.FC<IconPropsType> = ({ isClick }) => {
  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3511 22.3195C19.7837 22.5929 19.9038 23.1516 19.6194 23.5673L16.5374 28.0721C16.2529 28.4878 15.6716 28.6032 15.239 28.3299C14.8063 28.0565 14.6862 27.4979 14.9707 27.0821L18.0527 22.5774C18.3372 22.1616 18.9185 22.0462 19.3511 22.3195Z"
        fill={isClick ? "#E7C7E7" : "#000000"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.539 17.8151C16.9715 18.0887 17.0913 18.6474 16.8066 19.063L13.1035 24.4687C12.8188 24.8843 12.2374 24.9994 11.8049 24.7258C11.3724 24.4522 11.2527 23.8935 11.5374 23.4779L15.2405 18.0722C15.5252 17.6566 16.1066 17.5415 16.539 17.8151Z"
        fill={isClick ? "#E7C7E7" : "#000000"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4069 4.28226C19.043 4.02154 17.6292 4.15535 16.3444 4.66678C15.0596 5.17821 13.9615 6.04428 13.1889 7.15548C12.4163 8.26668 12.0039 9.5731 12.0039 10.9095C12.0039 11.4071 11.5842 11.8105 11.0664 11.8105C10.5486 11.8105 10.1289 11.4071 10.1289 10.9095C10.1289 10.4672 10.1646 10.0274 10.2347 9.59403C10.0463 9.56921 9.85588 9.55715 9.66498 9.5581L9.66016 9.55811C8.54127 9.55811 7.46822 9.98525 6.67705 10.7456C5.88588 11.5059 5.44141 12.5371 5.44141 13.6124C5.44141 14.6876 5.88588 15.7189 6.67705 16.4792C7.46822 17.2395 8.54127 17.6666 9.66016 17.6666H19.0352C20.4258 17.6666 21.7852 17.2703 22.9415 16.5279C24.0978 15.7854 24.999 14.7301 25.5312 13.4954C26.0634 12.2607 26.2026 10.902 25.9313 9.59128C25.66 8.28053 24.9903 7.07653 24.007 6.13154C23.0237 5.18654 21.7708 4.54298 20.4069 4.28226ZM10.7199 7.84365C10.9558 7.25282 11.2603 6.68598 11.6299 6.1544C12.6085 4.74688 13.9995 3.64985 15.6269 3.00204C17.2543 2.35423 19.045 2.18474 20.7727 2.51499C22.5003 2.84524 24.0873 3.6604 25.3328 4.8574C26.5784 6.0544 27.4266 7.57947 27.7703 9.23975C28.1139 10.9 27.9375 12.621 27.2635 14.1849C26.5894 15.7489 25.4478 17.0856 23.9832 18.0261C22.5186 18.9666 20.7966 19.4685 19.0352 19.4685H9.66016C8.04399 19.4685 6.49402 18.8515 5.35122 17.7533C4.20842 16.6551 3.56641 15.1655 3.56641 13.6124C3.56641 12.0592 4.20842 10.5697 5.35122 9.47144C6.49346 8.37374 8.04247 7.75682 9.65777 7.75622"
        fill={isClick ? "#E7C7E7" : "#000000"}
      />
    </svg>
  );
};

export default RainyIcon;
