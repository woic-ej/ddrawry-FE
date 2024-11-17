import DefaultErrorComponent from "@pages/ErrorPage/components/DefaultErrorComponent";

const GenericError = () => {
  return (
    <DefaultErrorComponent message="알 수 없는 에러가 발생하였습니다. 문제가 지속되면 관리자에게 문의하세요." />
  );
};

export default GenericError;
