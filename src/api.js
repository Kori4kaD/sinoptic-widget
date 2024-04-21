
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from './reducers/errorReducer';


export const forecast = createAsyncThunk('forecastGet', async (city, { dispatch }) => {
  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92318c5d9b887e39c183ff5a76c7abd4&units=metric`;
    const res = await axios.get(forecastUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      dispatch(setError(error.response.data));
    } else if (error.request) {
      console.error('Error Request:', error.request);
      dispatch(setError('Network error. Please try again.'));
    } else {
      console.error('Error:', error.message);
      dispatch(setError('An error occurred. Please try again.'));
    }
    throw error;
  }
});

export default forecast;
