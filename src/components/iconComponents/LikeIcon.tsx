import { useLikeStatus } from "@api/liked/useLikeStatus";

interface LikeIconProps {
  bookmark: boolean;
  id: number;
  isLikedPage?: boolean;
}

const LikeIcon = ({ bookmark = false, id, isLikedPage }: LikeIconProps) => {
  const { data: likeStatus = { bookmark }, mutate: toggleLike } = useLikeStatus(id, isLikedPage);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    toggleLike();
  };

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      className="cursor-pointer"
    >
      <path
        d="M37.3749 15.2188C37.2185 14.7265 36.917 14.2931 36.5099 13.9752C36.1028 13.6574 35.6092 13.4699 35.0937 13.4375L25.8124 12.7969L22.3749 4.125C22.1872 3.64751 21.8605 3.23735 21.4371 2.94763C21.0136 2.65791 20.513 2.50197 19.9999 2.5V2.5C19.4869 2.50197 18.9862 2.65791 18.5628 2.94763C18.1394 3.23735 17.8126 3.64751 17.6249 4.125L14.1249 12.8437L4.90618 13.4375C4.39135 13.472 3.89872 13.6602 3.49202 13.9778C3.08532 14.2954 2.78327 14.7277 2.62493 15.2188C2.46234 15.7174 2.45284 16.2533 2.59766 16.7574C2.74248 17.2614 3.03497 17.7106 3.43743 18.0469L10.5312 24.0469L8.42181 32.3438C8.27587 32.905 8.30213 33.4972 8.49719 34.0434C8.69224 34.5895 9.04707 35.0644 9.51556 35.4063C9.9703 35.7326 10.5121 35.9159 11.0716 35.9326C11.631 35.9493 12.1828 35.7987 12.6562 35.5L19.9843 30.8594H20.0156L27.9062 35.8437C28.3109 36.1068 28.7828 36.2478 29.2656 36.25C29.6597 36.2469 30.0479 36.1535 30.4003 35.9769C30.7527 35.8003 31.0599 35.5453 31.2983 35.2314C31.5367 34.9176 31.7 34.5532 31.7756 34.1664C31.8512 33.7795 31.837 33.3805 31.7343 33L29.4999 23.9219L36.5624 18.0469C36.9649 17.7106 37.2574 17.2614 37.4022 16.7574C37.547 16.2533 37.5375 15.7174 37.3749 15.2188Z"
        fill={likeStatus.bookmark === false ? "none" : "#E7C7E7"}
        stroke="#E7C7E7"
        strokeWidth={3}
      />
    </svg>
  );
};

export default LikeIcon;
