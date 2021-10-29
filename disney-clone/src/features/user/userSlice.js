import { createSlice } from '@reduxjs/toolkit';
//Initialize state
const initialState = {
    name: '',
    email: '',
    photo: ''
};

//Create Slice with slice name, intial state, and reducers to automatically generate action creators and action types that correspond to reducers and state
const userSlice = createSlice({
    name: "user",
    initialState,
    //Set Reducers
    reducers: {
      setUserLoginDetails: (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.photo = action.payload.photo;
      },
      
      setSignOutState: (state) => {
        state.name = null;
        state.email = null;
        state.photo = null;
      },
    },
  });

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
//Export functions
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;