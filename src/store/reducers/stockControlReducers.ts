import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StockControlState {
    price?: number;
    quantity: number;
}

const initialState: StockControlState = {
    quantity: 1,
};

export const stockControlSlice = createSlice({
    name: 'stockControlSlice',
    initialState: initialState,
    reducers: {
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        incrementQuantity: (state) => {
            state.quantity += 1;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            if (action.payload < 0) return;
            state.quantity = action.payload;
        },
        decrementQuantity: (state) => {
            if (state.quantity < 2) return;
            state.quantity -= 1;
        },
    },
});

export const { setPrice, incrementQuantity, setQuantity, decrementQuantity } = stockControlSlice.actions;
