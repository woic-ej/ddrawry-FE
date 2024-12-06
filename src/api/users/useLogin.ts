import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import { useQuery } from "@tanstack/react-query";

type FetchLoginResponse = {
  access_token: string;
  refresh_token?: string;
};

const IS_DEV = window.location.hostname === "localhost";

const fetchLogin = async (code: string) => {
  try {
    const { data }: { data: FetchLoginResponse } = await api.get({
      endpoint: `${apiRoutes.login}?${IS_DEV && "dev=1&"}code=${code}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLogin = (code: string) => {
  return useQuery({
    queryKey: ["userLogin"],
    queryFn: () => fetchLogin(code),
  });
};
