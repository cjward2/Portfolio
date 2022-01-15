import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import messageReducer from '../features/messageSlice';
import inventoryReducer from '../features/inventorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    inventory: inventoryReducer
  },
});
