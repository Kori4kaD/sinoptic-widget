
import { createSlice } from "@reduxjs/toolkit";
import { forecast } from "../api";
import cityReducer, { clearCity } from "./cityReducer";

const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    main: null,
    temperature: null,
    tempFeels: null,
    wind: null,
    icon: null,
    sunriseFormatted: null,
    sunsetFormatted: null,
    cityName: null,
  },
  reducers: {
    setMainData: (state, action) => {
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        if (action.payload.weather && action.payload.weather.length > 0) {
          state.main = action.payload.weather[0].main;
          state.icon = action.payload.weather[0].icon;
        }

        if (action.payload.main) {
          state.temperature = Math.round(action.payload.main.temp);
          state.tempFeels = Math.round(action.payload.main.feels_like);
        }

        if (action.payload.wind) {
          state.wind = action.payload.wind.speed;
        }
        if (action.payload.sys) {
          const sunrise = new Date(action.payload.sys.sunrise * 1000);

          const hoursR = sunrise.getHours().toString().padStart(2, "0");
          const minutesR = sunrise.getMinutes().toString().padStart(2, "0");

          state.sunriseFormatted = `${hoursR}:${minutesR}`;
          const sunset = new Date(action.payload.sys.sunset * 1000);

          const hoursS = sunset.getHours().toString().padStart(2, "0");
          const minutesS = sunset.getMinutes().toString().padStart(2, "0");

          state.sunsetFormatted = `${hoursS}:${minutesS}`;

          state.cityName=action.payload.name;
        }
      })
      .addCase(forecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { cityReducer, clearCity };
export const { setMainData } = mySlice.actions;
export default mySlice.reducer;
