import { configureStore } from '@reduxjs/toolkit'
import mySliceReducer from './reducers/weatherReducer';
import cityReducer from './reducers/cityReducer';
import errorReducer from './reducers/errorReducer';
export const store = configureStore({
  reducer: {
    mySlice: mySliceReducer,
    city: cityReducer,
    error: errorReducer,
  },
});
export default store;