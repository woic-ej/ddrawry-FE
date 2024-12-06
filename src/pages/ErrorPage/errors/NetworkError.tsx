import DefaultErrorComponent from "@pages/ErrorPage/components/DefaultErrorComponent";

interface Props {
  handleClick: () => void;
}

const NetworkError = ({ handleClick }: Props) => {
  return (
    <DefaultErrorComponent
      message="네트워크 연결이 불안정합니다. 인터넷 상태를 확인해주세요."
      handleClick={handleClick}
    />
  );
};

export default NetworkError;
