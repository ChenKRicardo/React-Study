import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, { payload }) => {
      // console.log(state.value);
      console.log(payload);
      state.value += payload * 1;
    },
    decrement: (state, { payload }) => {
      state.value -= payload * 1;
    },
  },
});
export const asyncIncrement = (value, time) => {
  return (dispatch, getState) => {
    console.log(getState());
    setTimeout(() => {
      dispatch(increment(value));
    }, time);
  };
};
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
