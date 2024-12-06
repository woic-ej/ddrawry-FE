import LikeIcon from "@components/iconComponents/LikeIcon";

interface Props {
  bookmark: boolean;
  id: number;
}

const HeaderWithLike = ({ bookmark, id }: Props) => {
  return (
    <div className="z-[50] sticky top-0 flex w-full p-0 min-h-[50px] justify-center items-center bg-Lemon">
      <p className="text-center title-font leading-[48.96px]">일기장</p>
      <div className="absolute right-4">
        <LikeIcon bookmark={bookmark} id={id} />
      </div>
    </div>
  );
};

export default HeaderWithLike;
