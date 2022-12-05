import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch',
  async () => {
    const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
    const data = await resp.json();
    return data.value;
  }
)

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { value: 0, status: 'welcome' },
  reducers: { // 동기적
    up: (state, action) => {
      state.value = state.value + action.payload;
    }
  },
  extraReducers: (builder) => { // 비동기적
    builder
      .addCase(asyncUpFetch.pending, (state, action) => {
        state.status = 'Loading';
      })
      .addCase(asyncUpFetch.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'Complete';
      })
      .addCase(asyncUpFetch.rejected, (state, action) => {
        state.status = 'Fail';
      })
  }
})

export default counterSlice;
export const { up } = counterSlice.actions;
export { asyncUpFetch }