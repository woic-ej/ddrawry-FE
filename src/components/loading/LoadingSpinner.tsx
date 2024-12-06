import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center flex-grow h-full">
      <FadeLoader color="#A7C7E7" />
    </div>
  );
};

export default LoadingSpinner;
