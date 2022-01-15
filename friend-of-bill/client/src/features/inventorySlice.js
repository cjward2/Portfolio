import { createSlice } from '@reduxjs/toolkit';

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    inventory: []
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setInventory: (state, action) => {
      state.inventory = action.payload;
    },
    clearInventory: (state) => {
      state.inventory = null;
    }
  }
});


//export actions!!
export const { setInventory, clearInventory } = inventorySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInventory = (state) => state.inventory.inventory;


export default inventorySlice.reducer;

