import { createSlice } from '@reduxjs/toolkit';


export const guestSlice = createSlice({
    name: 'guest',
    initialState: {
      guest: null
    },
    reducers: {
      guestLogin: (state, action) => {
        state.guest = action.payload;
      },
      guestLogout: (state) => {
        state.guest = null;
      }
    }
  })

export const { guestLogin, guestLogout } = guestSlice.actions;

export const selectGuest = (state) => state.counter.guest;

export default guestSlice.reducer;