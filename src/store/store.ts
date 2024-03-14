import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user';


import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import logger from "redux-logger";



const rootPersistConfig = {
    key: "root",
    storage: storage,
    whitelist: [],
};
  
const myMiddlewares = [logger];

export const rootReducer = persistReducer(
    rootPersistConfig
    ,
    combineReducers({
      user: userReducer,
    })
  );
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(myMiddlewares);
      return middlewares;
    },
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type PersistState = ReturnType<typeof persistor.getState>;
  export type AppDispatch = typeof store.dispatch;