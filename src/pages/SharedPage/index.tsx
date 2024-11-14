import BigButton from "@components/buttons/BigButton";
import { useLocation, useNavigate } from "react-router-dom";

const SharedPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sharedImageUrl = queryParams.get("image");
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col gap-[40px] items-center min-w[900px] pb-[140px] pt-[30px]">
        {sharedImageUrl ? (
          <div className="flex justify-center relative">
            <img
              src={decodeURIComponent(sharedImageUrl)}
              alt="Shared Diary"
              className="min-w-[900px] h-[1200px]"
            />
          </div>
        ) : (
          <p>이미지를 로드할 수 없습니다.</p>
        )}
        <div className="absolute translate-y-[1230px] translate-x-[238px]">
          <BigButton title="나만의 일기 작성하러 ㄱㄱ" color="blue" onClick={handleGoHome} />
        </div>
      </div>
    </>
  );
};

export default SharedPage;
