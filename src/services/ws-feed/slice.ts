import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IResponseWSS,
  WebsocketStatus,
} from "../../utils/types";

export type TWSFeedStore = {
  status: WebsocketStatus;
  response: IResponseWSS;
  connectionError: string | null;
};

const initialState: TWSFeedStore = {
  status: WebsocketStatus.OFFLINE,
  response: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  connectionError: null,
};

export const feedOrdersSice = createSlice({
  name: "feedOrders",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<IResponseWSS>) => {
      state.response = action.payload as IResponseWSS;
    },
  },
  selectors: {
    getStatus: (state) => state.status,
    getResponse: (state) => state.response,
    getError: (state) => state.connectionError,
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  feedOrdersSice.actions;
export const { getStatus, getResponse, getError } = feedOrdersSice.selectors;
