import { apiRoutes } from "./apiRoutes";

interface IFetchOptions<T = unknown> {
  endpoint: string;
  body?: T;
  method?: string;
  id?: string;
}

interface IGetOptions {
  endpoint: string;
  noAuth?: boolean;
}

interface IPostOptions<T = unknown> {
  endpoint: string;
  body?: T;
}

interface IDeleteOptions {
  endpoint: string;
}

const API_BASE_URL =
  import.meta.env.NODE_ENV === "production" ? import.meta.env.VITE_API_URL : "/api/v1";

const _fetch = async <T = unknown, R = unknown>({
  method,
  endpoint,
  body,
  noAuth = false,
}: IFetchOptions<T> & { noAuth?: boolean }): Promise<R> => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (!noAuth) {
    const authorization = localStorage.getItem("access_token");
    if (authorization) {
      headers.Authorization = `Bearer ${authorization}`;
    }
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  let res = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

  if (!res.ok) {
    const { detail } = await res.json();

    if (res.status === 401 && !noAuth) {
      localStorage.removeItem("access_token");

      const newAccessToken = await refreshAccessToken();
      if (!detail.includes("kakao"))
        if (newAccessToken) {
          headers.Authorization = `Bearer ${newAccessToken}`;
          res = await fetch(`${API_BASE_URL}${endpoint}`, { ...requestOptions, headers });
        } else {
          const currentPath = window.location.pathname + window.location.search;
          localStorage.setItem("redirectedFrom", currentPath);
          window.location.href = "/login";
          throw new Error("refreshToken 만료");
        }
    } else if (res.status === 404) {
      window.location.href = "/error";
      throw new Error("404 Not Found");
    } else throw new Error(detail);
  }

  return await res.json();
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    // `_get` 함수에 noAuth 옵션을 설정하여 Authorization 없이 요청
    const { data } = await _get<{ data: { access_token: string } }>({
      endpoint: apiRoutes.refresh,
      noAuth: true,
    });

    // 새로운 액세스 토큰을 로컬 스토리지에 저장하고 반환
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// T: 요청 body의 타입,
// R: 응답 body의 타입

const _get = async <R = unknown>({ endpoint, noAuth = false }: IGetOptions): Promise<R> => {
  return _fetch<never, R>({ method: "GET", endpoint, noAuth });
};

const _post = async <T = unknown, R = unknown>({ endpoint, body }: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "POST", endpoint, body });
};

const _patch = async <T = unknown, R = unknown>({
  endpoint,
  body,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "PATCH", endpoint, body });
};

const _put = async <T = unknown, R = unknown>({ endpoint, body }: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "PUT", endpoint, body });
};

const _delete = async <R = unknown>({ endpoint }: IDeleteOptions): Promise<R> => {
  return _fetch<never, R>({ method: "DELETE", endpoint });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
  put: _put,
  delete: _delete,
};

export default api;
