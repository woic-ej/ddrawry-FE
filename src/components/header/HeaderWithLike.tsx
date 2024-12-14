import LikeIcon from "@components/iconComponents/LikeIcon";

interface Props {
  bookmark: boolean;
  id: number;
}

const HeaderWithLike = ({ bookmark, id }: Props) => {
  return (
    <div className="header-layout bg-Lemon">
      <p className="text-center title-font leading-[48.96px]">일기장</p>
      <div className="absolute right-2 md:right-4">
        <LikeIcon bookmark={bookmark} id={id} />
      </div>
    </div>
  );
};

export default HeaderWithLike;
