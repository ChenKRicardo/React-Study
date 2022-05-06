import { createSlice } from "@reduxjs/toolkit";

const PersonSlice = createSlice({
  name: "pserson",
  initialState: {
    person: [],
  },
  reducers: {
    addPerson: (state, { payload }) => {
      //使用push等添加操作会使person改写，即PersonSlice不再是纯函数
      state.person = [payload, ...state.person];
    },
  },
});

export const { addPerson } = PersonSlice.actions;
export default PersonSlice.reducer;
