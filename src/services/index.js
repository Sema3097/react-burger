import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fetchApi } from "./fetch-ingredients";
import { setupListeners } from "@reduxjs/toolkit/query";
import constructorReducer from "./constructor-ingredients-save";
import addDataReducer from "./add-data-to-modal";
import updatingModalReducer from "./getting-and-updating-modal";
import { apiOrder } from "./getting-order";

const rootReducer = combineReducers({
  [fetchApi.reducerPath]: fetchApi.reducer,
  [apiOrder.reducerPath]: apiOrder.reducer,
  filling: constructorReducer,
  addData: addDataReducer,
  updatingModal: updatingModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware, apiOrder.middleware),
});

setupListeners(store.dispatch);
