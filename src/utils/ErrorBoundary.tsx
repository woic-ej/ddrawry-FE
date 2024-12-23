import { ErrorBoundary } from "react-error-boundary";
import { FallbackProps } from "react-error-boundary";
import { CustomError } from "./CustomError";
import NotFoundError from "@pages/ErrorPage/errors/NotFoundError";
import ServerError from "@pages/ErrorPage/errors/ServerError";
import GenericError from "@pages/ErrorPage/errors/GenericError";
import NetworkError from "@pages/ErrorPage/errors/NetworkError";

const ErrorFallback = ({ error }: FallbackProps) => {
  if (error instanceof CustomError) {
    switch (error.statusCode) {
      case 401:
        return;
      case 404:
        return <NotFoundError message={error.message} />;
      case 500:
      case 502:
        return (
          <ServerError
            message="서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            handleClick={() => window.location.reload()}
          />
        );
      case 503:
        return <ServerError message="현재 서버를 사용할 수 없습니다. 잠시 후 다시 시도해주세요." />;
      case 504:
        return (
          <ServerError
            message="서버 응답 시간이 초과되었습니다. 
            인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요."
            handleClick={() => window.location.reload()}
          />
        );
      default:
        return <GenericError />;
    }
  } else if (error instanceof TypeError) {
    return <NetworkError handleClick={() => window.location.reload()} />;
  }

  return <GenericError />;
};

export default function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}
