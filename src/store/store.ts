import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { chuckNorrisApi } from "./services/chuckNorrisApi";

export const store = configureStore({
  reducer: {
    [chuckNorrisApi.reducerPath]: chuckNorrisApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chuckNorrisApi.middleware),
});

setupListeners(store.dispatch);
