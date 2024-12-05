import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { fetchApi } from "./fetch-ingredients";
import { setupListeners } from "@reduxjs/toolkit/query";
import constructorReducer from "./constructor-ingredients-save";
import updatingModalReducer from "./getting-and-updating-modal";
import { apiOrder } from "./getting-order";
import { apiRegister } from "./safety/register-slice";
import { apiAuth } from "./safety/auth-slice";
import { apiLogout } from "./safety/logout-slice";
import { userSlice } from "./safety/user";
import {
  feedOrdersSice,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./ws-feed/slice";
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsConnect, wsDisconnect } from "./ws-feed/actions";
import { IResponseWSS } from "../utils/types";
import { feedOrdersProfileSice, wsCloseProfile, wsConnectingProfile, wsErrorProfile, wsMessageProfile, wsOpenProfile } from "./ws-feed-profile/slice";
import { wsConnectProfile, wsDisconnectProfile } from "./ws-feed-profile/actions";

const WSOrdersMiddleware = socketMiddleware<IResponseWSS, unknown>({
  feedOrders: {
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
  },
  feedOrdersProfile: {
    connect: wsConnectProfile,
    disconnect: wsDisconnectProfile,
    onConnecting: wsConnectingProfile,
    onOpen: wsOpenProfile,
    onClose: wsCloseProfile,
    onError: wsErrorProfile,
    onMessage: wsMessageProfile,
  },
});

const rootReducer = combineSlices({
  [fetchApi.reducerPath]: fetchApi.reducer,
  [apiOrder.reducerPath]: apiOrder.reducer,
  [apiRegister.reducerPath]: apiRegister.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiLogout.reducerPath]: apiLogout.reducer,
  filling: constructorReducer,
  updatingModal: updatingModalReducer,
  user: userSlice.reducer,
  feedOrders: feedOrdersSice.reducer,
  feedOrdersProfile: feedOrdersProfileSice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fetchApi.middleware,
      apiOrder.middleware,
      apiRegister.middleware,
      apiAuth.middleware,
      apiLogout.middleware,
      WSOrdersMiddleware,
    ),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
