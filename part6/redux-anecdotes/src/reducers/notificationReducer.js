import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Initial notification message';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeMessage(state, action) {
      return action.payload;
    }
  }
})

export const { changeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;