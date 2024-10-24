import { UPDATE_DATA_USER } from "./data";
import { UPDATE_TOKEN } from "./data";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  
  export const refreshToken = async () => {
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

  export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        options.headers.Authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        throw err;
      }
    }
  };  

  export const getUser = async () => {
    const token = localStorage.getItem("accessToken");
  
    const response = await fetch(`${UPDATE_DATA_USER}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  
    return await checkResponse(response);
  };
