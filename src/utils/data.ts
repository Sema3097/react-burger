const token = localStorage.getItem("accessToken");
const adressToken = token?.slice(7);

export const API_INGREDIENTS: string =
  "https://norma.nomoreparties.space/api/ingredients";

export const API_ORDER: string = "https://norma.nomoreparties.space/api/orders";

export const FORGOT_PASSWORD: string =
  "https://norma.nomoreparties.space/api/password-reset";

export const RESET_PASSWORD: string =
  "https://norma.nomoreparties.space/api/password-reset/reset";

export const REGISTER: string =
  "https://norma.nomoreparties.space/api/auth/register";

export const AUTHORIZATION: string =
  "https://norma.nomoreparties.space/api/auth/login";

export const LOGOUT: string =
  "https://norma.nomoreparties.space/api/auth/logout";

export const UPDATE_DATA_USER: string =
  "https://norma.nomoreparties.space/api/auth/user";

export const UPDATE_TOKEN: string =
  "https://norma.nomoreparties.space/api/auth/token";

export const WSS_API: string = "wss://norma.nomoreparties.space/orders/all";

export const WSS_API_Profile: string = `wss://norma.nomoreparties.space/orders?token=${adressToken}`;

