import BigButton from "@components/buttons/BigButton";
import EmptyState from "@components/empty/EmptyState";
import DefaultHeader from "@components/header/DefaultHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col h-screen">
      <DefaultHeader title="띠로리" />
      <div className="flex flex-grow gap-[130px] flex-col  items-center justify-center">
        <div>
          <EmptyState message="Error - 어떤 에러가 발생했어요." />
        </div>
        <BigButton title="홈으로 이동하기" color="blue" onClick={handleGoHome} />
      </div>
    </div>
  );
};

export default ErrorPage;
