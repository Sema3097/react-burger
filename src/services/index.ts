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

const rootReducer = combineSlices({
  [fetchApi.reducerPath]: fetchApi.reducer,
  [apiOrder.reducerPath]: apiOrder.reducer,
  [apiRegister.reducerPath]: apiRegister.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiLogout.reducerPath]: apiLogout.reducer,
  filling: constructorReducer,
  updatingModal: updatingModalReducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fetchApi.middleware,
      apiOrder.middleware,
      apiRegister.middleware,
      apiAuth.middleware,
      apiLogout.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
