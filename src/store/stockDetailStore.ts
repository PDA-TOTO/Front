import { combineReducers } from "redux";
import { stockControlSlice } from "./reducers/stockControlReducers";
import { stockWebSocketSlice } from "./reducers/stockWebSocketReducers";
import { configureStore } from "@reduxjs/toolkit";

const stockDetailReducer = combineReducers({
  stockControl: stockControlSlice.reducer,
  stockWebSocket: stockWebSocketSlice.reducer,
});

const stockDetailStore = configureStore({
  reducer: stockDetailReducer,
});

export type StockDetailStoreState = ReturnType<
  typeof stockDetailStore.getState
>;
export type StockDetailDispatch = typeof stockDetailStore.dispatch;

export default stockDetailStore;
