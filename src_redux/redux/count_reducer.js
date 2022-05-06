import { createSlice, } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      console.log(state.value);
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
export const asyncIncrement =(value,time)=>{
 return (dispatch,getState)=>{
   console.log(getState());
  setTimeout(()=>{
    dispatch(increment(value))
  },time)
 }
}
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
