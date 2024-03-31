import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StockWebSocketInitialState {
  krxCode: string;
  aspr_acpt_hour: string;
  askp1: string; // 매도호가1
  askp2: string; // 매도호가2
  askp3: string; // 매도호가3
  askp4: string; // 매도호가4
  askp5: string; // 매도호가5
  askp6: string; // 매도호가6
  askp7: string; // 매도호가7
  askp8: string; // 매도호가8
  askp9: string; // 매도호가9
  askp10: string; // 매도호가10
  bidp1: string; // 매수호가1
  bidp2: string; // 매수호가2
  bidp3: string; // 매수호가3
  bidp4: string; // 매수호가4
  bidp5: string; // 매수호가5
  bidp6: string; // 매수호가6
  bidp7: string; // 매수호가7
  bidp8: string; // 매수호가8
  bidp9: string; // 매수호가9
  bidp10: string; // 매수호가10
  askp_rsqn1: string; // 매도호가 잔량1
  askp_rsqn2: string; // 매도호가 잔량2
  askp_rsqn3: string; // 매도호가 잔량3
  askp_rsqn4: string; // 매도호가 잔량4
  askp_rsqn5: string; // 매도호가 잔량5
  askp_rsqn6: string; // 매도호가 잔량6
  askp_rsqn7: string; // 매도호가 잔량7
  askp_rsqn8: string; // 매도호가 잔량8
  askp_rsqn9: string; // 매도호가 잔량9
  askp_rsqn10: string; // 매도호가 잔량10
  bidp_rsqn1: string; // 매수호가 잔량1
  bidp_rsqn2: string; // 매수호가 잔량2
  bidp_rsqn3: string; // 매수호가 잔량3
  bidp_rsqn4: string; // 매수호가 잔량4
  bidp_rsqn5: string; // 매수호가 잔량5
  bidp_rsqn6: string; // 매수호가 잔량6
  bidp_rsqn7: string; // 매수호가 잔량7
  bidp_rsqn8: string; // 매수호가 잔량8
  bidp_rsqn9: string; // 매수호가 잔량9
  bidp_rsqn10: string; // 매수호가 잔량10
  [key: string]: string;
}

const initialState: StockWebSocketInitialState = {
  krxCode: "",
  aspr_acpt_hour: "",
  askp1: "",
  askp2: "",
  askp3: "",
  askp4: "",
  askp5: "",
  askp6: "",
  askp7: "",
  askp8: "",
  askp9: "",
  askp10: "",
  bidp1: "",
  bidp2: "",
  bidp3: "",
  bidp4: "",
  bidp5: "",
  bidp6: "",
  bidp7: "",
  bidp8: "",
  bidp9: "",
  bidp10: "",
  askp_rsqn1: "",
  askp_rsqn2: "",
  askp_rsqn3: "",
  askp_rsqn4: "",
  askp_rsqn5: "",
  askp_rsqn6: "",
  askp_rsqn7: "",
  askp_rsqn8: "",
  askp_rsqn9: "",
  askp_rsqn10: "",
  bidp_rsqn1: "",
  bidp_rsqn2: "",
  bidp_rsqn3: "",
  bidp_rsqn4: "",
  bidp_rsqn5: "",
  bidp_rsqn6: "",
  bidp_rsqn7: "",
  bidp_rsqn8: "",
  bidp_rsqn9: "",
  bidp_rsqn10: "",
};

export const stockWebSocketSlice = createSlice({
  name: "stockWebSocketSlice",
  initialState: initialState,
  reducers: {
    pushWebsocketPrice: (
      state,
      action: PayloadAction<StockWebSocketInitialState>
    ) => {
      state.krxCode = action.payload.krxCode;
      state.aspr_acpt_hour = action.payload.aspr_acpt_hour;
      state.askp1 = action.payload.askp1;
      state.askp2 = action.payload.askp2;
      state.askp3 = action.payload.askp3;
      state.askp4 = action.payload.askp4;
      state.askp5 = action.payload.askp5;
      state.askp6 = action.payload.askp6;
      state.askp7 = action.payload.askp7;
      state.askp8 = action.payload.askp8;
      state.askp9 = action.payload.askp9;
      state.askp10 = action.payload.askp10;
      state.bidp1 = action.payload.bidp1;
      state.bidp2 = action.payload.bidp2;
      state.bidp3 = action.payload.bidp3;
      state.bidp4 = action.payload.bidp4;
      state.bidp5 = action.payload.bidp5;
      state.bidp6 = action.payload.bidp6;
      state.bidp7 = action.payload.bidp7;
      state.bidp8 = action.payload.bidp8;
      state.bidp9 = action.payload.bidp9;
      state.bidp10 = action.payload.bidp10;
      state.askp_rsqn1 = action.payload.askp_rsqn1;
      state.askp_rsqn2 = action.payload.askp_rsqn2;
      state.askp_rsqn3 = action.payload.askp_rsqn3;
      state.askp_rsqn4 = action.payload.askp_rsqn4;
      state.askp_rsqn5 = action.payload.askp_rsqn5;
      state.askp_rsqn6 = action.payload.askp_rsqn6;
      state.askp_rsqn7 = action.payload.askp_rsqn7;
      state.askp_rsqn8 = action.payload.askp_rsqn8;
      state.askp_rsqn9 = action.payload.askp_rsqn9;
      state.askp_rsqn10 = action.payload.askp_rsqn10;
      state.bidp_rsqn1 = action.payload.bidp_rsqn1;
      state.bidp_rsqn2 = action.payload.bidp_rsqn2;
      state.bidp_rsqn3 = action.payload.bidp_rsqn3;
      state.bidp_rsqn4 = action.payload.bidp_rsqn4;
      state.bidp_rsqn5 = action.payload.bidp_rsqn5;
      state.bidp_rsqn6 = action.payload.bidp_rsqn6;
      state.bidp_rsqn7 = action.payload.bidp_rsqn7;
      state.bidp_rsqn8 = action.payload.bidp_rsqn8;
      state.bidp_rsqn9 = action.payload.bidp_rsqn9;
      state.bidp_rsqn10 = action.payload.bidp_rsqn10;
    },
    resetWebSocketState: (state) => {
      state = initialState;
    },
  },
});

export const { pushWebsocketPrice, resetWebSocketState } =
  stockWebSocketSlice.actions;
