import { configureStore } from "@reduxjs/toolkit";
import { fetchApi } from "./fetch-ingredients";
import { setupListeners } from "@reduxjs/toolkit/query";
import constructorReducer from "./constructor-ingredients-save";
import addDataReducer from "./add-data-to-modal";

export const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    filling: constructorReducer,
    addData: addDataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

setupListeners(store.dispatch);
