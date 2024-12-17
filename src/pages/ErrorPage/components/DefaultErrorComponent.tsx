import BigButton from "@components/buttons/BigButton";
import EmptyState from "@components/empty/EmptyState";
import DefaultHeader from "@components/header/DefaultHeader";

interface Props {
  message: string;
  buttonText?: string;
  handleClick?: () => void;
}

const DefaultErrorComponent = ({ message, buttonText, handleClick }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <DefaultHeader title="띠로리" />
      <div className="flex flex-grow gap-[130px] flex-col  items-center justify-center">
        <div>
          <EmptyState message={message} />
        </div>
        {handleClick && buttonText && (
          <div className="w-2/5">
            <BigButton title={buttonText} color="blue" onClick={handleClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultErrorComponent;
