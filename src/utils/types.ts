export interface Iingredient {
  calories: string;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobil: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  uniqueid?: string | undefined;
}

export interface IingredientsProps {
  ingredients: Iingredient[];
}

export interface IUser {
  email: string;
  name: string;
}

export interface IFetchResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUserAuth {
  success: boolean;
  user: IUser;
}

interface IOwnerFromOrderDetails {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

interface IOrderFromOrderDetails {
  createdAt: string;
  ingredients: Iingredient[];
  name: string;
  number: number;
  owner: IOwnerFromOrderDetails;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IResponseDataToOrderDetails {
  name: string;
  order: IOrderFromOrderDetails;
  success: boolean;
}

interface IIngredientsID {
  ingredients: string;
}

export interface IOrder {
  ingredients: IIngredientsID[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string
  message?: string;
}

export interface IResponseWSS {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum WSResponseAction {
  DATA = "data",
  UPDATE = "update",
}

export type TData = {
  type: WSResponseAction.DATA;
  data: IResponseWSS;
};

export type TUpdate = {
  type: WSResponseAction.UPDATE;
  data: IResponseWSS;
};

export type TWSResponseActionType = TData | TUpdate;
export type TWSResponseActionTypes = Array<TWSResponseActionType>;
