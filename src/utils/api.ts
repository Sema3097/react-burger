import { UPDATE_DATA_USER } from "./data";
import { UPDATE_TOKEN } from "./data";
import { IFetchResponse } from "./types";

export const checkResponse = (res: Response): Promise<IFetchResponse> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async (): Promise<IFetchResponse> => {
  const response = await fetch(`${UPDATE_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

  const refreshData = await checkResponse(response);

  if (!refreshData.success) {
    throw new Error("Refresh token failed");
  }

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);
  return refreshData;
};

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit
): Promise<IFetchResponse> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (options.headers) {
        if (options.headers instanceof Headers) {
          options.headers.set(
            "Authorization",
            `Bearer ${refreshData.accessToken}`
          );
        } else if (Array.isArray(options.headers)) {
          const headerIndex = options.headers.findIndex(
            ([key]) => key.toLowerCase() === "authorization"
          );
          if (headerIndex !== -1) {
            options.headers[
              headerIndex
            ][1] = `Bearer ${refreshData.accessToken}`;
          } else {
            options.headers.push([
              "Authorization",
              `Bearer ${refreshData.accessToken}`,
            ]);
          }
        } else {
          (options.headers as Record<string, string>)[
            "Authorization"
          ] = `Bearer ${refreshData.accessToken}`;
        }
      } else {
        options.headers = {
          Authorization: `Bearer ${refreshData.accessToken}`,
        };
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      throw err;
    }
  }
};

export const getUser = async (): Promise<IFetchResponse> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${UPDATE_DATA_USER}`, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  });

  return await checkResponse(response);
};
