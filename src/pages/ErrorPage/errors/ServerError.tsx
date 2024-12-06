import DefaultErrorComponent from "@pages/ErrorPage/components/DefaultErrorComponent";

interface Props {
  message: string;
  handleClick?: () => void;
}

const ServerError = ({ message, handleClick }: Props) => {
  return (
    <DefaultErrorComponent
      message={message}
      buttonText={handleClick && "다시 시도"}
      handleClick={handleClick}
    />
  );
};

export default ServerError;
