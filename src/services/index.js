import { configureStore } from "@reduxjs/toolkit";
import { fetchApi } from "./fetch-ingredients";
import { setupListeners } from "@reduxjs/toolkit/query";
import constructorReducer from "./constructor-ingredients-save";
import addDataReducer from "./add-data-to-modal";
import updatingModalReducer from "./getting-and-updating-modal";
import { apiOrder } from "./getting-order";

export const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    [apiOrder.reducerPath]: apiOrder.reducer,
    filling: constructorReducer,
    addData: addDataReducer,
    updatingModal: updatingModalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware, apiOrder.middleware),
});

setupListeners(store.dispatch);
