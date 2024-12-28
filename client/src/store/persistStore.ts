import { combineReducers } from "@reduxjs/toolkit";
import { api } from "@/store/api";
import globalReducer from "@/store/state";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import persistReducer from "redux-persist/es/persistReducer";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
