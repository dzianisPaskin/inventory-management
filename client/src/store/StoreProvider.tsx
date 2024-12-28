"use client";

import { FC, ReactNode, useRef } from "react";
import { AppStoreType } from "./types";
import { createStore } from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStoreType>(createStore());
  if (!storeRef.current) {
    storeRef.current = createStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
