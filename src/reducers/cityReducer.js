
import { createSlice } from '@reduxjs/toolkit';

const citySlice = createSlice({
  name: 'city',
  initialState:  { city: 'Kyiv' },
  reducers: {
    setCity: (state, action) => {
        return { ...state, city: action.payload };
      },
      clearCity: (state) => {
        return { ...state, city: '' };
      },
  },
});

export const { setCity, clearCity } = citySlice.actions;
export default citySlice.reducer;
