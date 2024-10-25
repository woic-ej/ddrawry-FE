import { DOMAIN } from "@constants/domain";

interface IFetchOptions<T = unknown> {
  endpoint: string;
  body?: T;
  method?: string;
  id?: string;
}

interface IGetOptions {
  endpoint: string;
}

interface IPostOptions<T = unknown> {
  endpoint: string;
  body?: T;
}

interface IDeleteOptions {
  endpoint: string;
}

const API_BASE_URL = import.meta.env.NODE_ENV === "production" ? DOMAIN : "/api/v1";

const _fetch = async <T = unknown, R = unknown>({
  method,
  endpoint,
  body,
}: IFetchOptions<T>): Promise<R> => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const authorization = JSON.stringify(localStorage.getItem("access_token"));

  if (authorization) {
    headers.Authorization = "Bearer " + authorization;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return await res.json();
};

// T: 요청 body의 타입,
// R: 응답 body의 타입

const _get = async <R = unknown>({ endpoint }: IGetOptions): Promise<R> => {
  return _fetch<never, R>({ method: "GET", endpoint });
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
