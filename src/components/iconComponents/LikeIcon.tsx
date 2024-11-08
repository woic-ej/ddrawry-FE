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
      width="47.67"
      height="45.54"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      className="cursor-pointer"
    >
      <path
        d="M48.5875 19.7844C48.3841 19.1445 47.9921 18.581 47.4629 18.1678C46.9337 17.7546 46.292 17.5109 45.6219 17.4688L33.5563 16.6359L29.0875 5.3625C28.8435 4.74176 28.4188 4.20855 27.8683 3.83192C27.3178 3.45529 26.667 3.25257 26 3.25C25.333 3.25257 24.6822 3.45529 24.1317 3.83192C23.5813 4.20855 23.1565 4.74176 22.9125 5.3625L18.3625 16.6969L6.37814 17.4688C5.70885 17.5136 5.06843 17.7583 4.53972 18.1711C4.01101 18.584 3.61834 19.1459 3.41251 19.7844C3.20114 20.4326 3.18879 21.1293 3.37706 21.7846C3.56532 22.4399 3.94556 23.0238 4.46876 23.4609L13.6906 31.2609L10.9484 42.0469C10.7587 42.7765 10.7929 43.5464 11.0464 44.2564C11.3 44.9664 11.7613 45.5837 12.3703 46.0281C12.9615 46.4524 13.6658 46.6907 14.3931 46.7124C15.1205 46.7341 15.8377 46.5383 16.4531 46.15L25.9797 40.1172H26.0203L36.2781 46.5969C36.8043 46.9388 37.4178 47.1222 38.0453 47.125C38.5577 47.121 39.0623 46.9995 39.5204 46.77C39.9785 46.5404 40.3779 46.2089 40.6879 45.8009C40.9978 45.3928 41.2101 44.9192 41.3083 44.4163C41.4066 43.9134 41.3883 43.3947 41.2547 42.9L38.35 31.0984L47.5313 23.4609C48.0545 23.0238 48.4347 22.4399 48.623 21.7846C48.8112 21.1293 48.7989 20.4326 48.5875 19.7844Z"
        fill={likeStatus.bookmark === false ? "none" : "#E7C7E7"}
        stroke="#E7C7E7"
        strokeWidth={5}
      />
    </svg>
  );
};

export default LikeIcon;
