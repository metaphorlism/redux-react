import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state = initialState;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    deduceByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, addByAmount, deduceByAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
