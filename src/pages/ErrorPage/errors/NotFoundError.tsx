import DefaultErrorComponent from "@pages/ErrorPage/components/DefaultErrorComponent";

interface Props {
  message?: string;
}

const NotFoundError = ({ message = "해당 페이지를 찾을 수 없습니다." }: Props) => {
  return (
    <DefaultErrorComponent
      message={message}
      buttonText="홈으로 이동하기"
      handleClick={() => window.location.replace("/")}
    />
  );
};

export default NotFoundError;
