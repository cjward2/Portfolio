import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMsg: (state, action) => {
      state.message = action.payload;
    },
    clearMsg: (state) => {
      state.message = null;
    }
  }
});


//export actions!!
export const { setMsg, clearMsg } = messageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMessage = (state) => state.message.message;


export default messageSlice.reducer;

