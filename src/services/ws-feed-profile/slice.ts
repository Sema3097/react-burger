import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseWSS, WebsocketStatus } from "../../utils/types";

export type TWSFeedStore = {
  status: WebsocketStatus;
  responseProfile: IResponseWSS;
  connectionError: string | null;
};

const initialState: TWSFeedStore = {
  status: WebsocketStatus.OFFLINE,
  responseProfile: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  connectionError: null,
};

export const feedOrdersProfileSice = createSlice({
  name: "feedOrdersProfile",
  initialState,
  reducers: {
    wsConnectingProfile: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpenProfile: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsCloseProfile: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsErrorProfile: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessageProfile: (state, action: PayloadAction<IResponseWSS>) => {
      state.responseProfile = action.payload as IResponseWSS;
    },
  },
  selectors: {
    getStatusProfile: (state) => state.status,
    getResponsesProfile: (state) => state.responseProfile,
    getErrorsProfile: (state) => state.connectionError,
  },
});

export const {
  wsConnectingProfile,
  wsOpenProfile,
  wsCloseProfile,
  wsErrorProfile,
  wsMessageProfile,
} = feedOrdersProfileSice.actions;
export const { getStatusProfile, getResponsesProfile, getErrorsProfile } =
  feedOrdersProfileSice.selectors;
