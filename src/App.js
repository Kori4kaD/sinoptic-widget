import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { forecast } from "./api";
import { setCity } from "./reducers/cityReducer";
import { setMainData } from "./reducers/weatherReducer";
import { setError, clearError } from "./reducers/errorReducer";
import videoFile from './snow.mp4';

const App = () => {
  const dispatch = useDispatch();
  const {
    status,
    main,
    temperature,
    tempFeels,
    wind,
    icon,
    sunriseFormatted,
    sunsetFormatted,
    cityName,
  } = useSelector((state) => state.mySlice);
  const { city } = useSelector((state) => state.city);

  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, city]);

  useEffect(() => {
    dispatch(setMainData({}));
    if (city) {
      dispatch(forecast(city));
    }
  }, [dispatch, city]);

  const handleSearch = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    if (inputCity) {
      dispatch(setCity(inputCity));
      dispatch(forecast(inputCity)).then(
        () => dispatch(clearError()),

        (error) => dispatch(setError(error))
      );
    }
  };

  return (
    <div className="App">
       <video className="video-background" autoPlay loop muted>
        <source src={videoFile} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div className="search">
      <form onSubmit={handleSearchButtonClick}>
        <label>Enter your city</label>
        <input
          type="text"
          name="city"
          // placeholder="city"
          value={inputCity}
          onChange={handleSearch}
        />
        <button className="button" type="submit" onClick={handleSearchButtonClick}>
          search
        </button>
      </form>
      </div>
      
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && (
        <p>Your city was not found, please try changing your query</p>
      )}
      {status === "succeeded" && (
        <div className="container">
          <div className="icon">
            <h2>Weather for {cityName}</h2>
            <img
           
              src={`https://korica-weather-js1.netlify.app/images/${icon}.png`}
              alt="IconTest"
            />
          </div>
          <div className="info">
            <h4> {main}</h4>
            <p>Temp: {' '}{temperature}</p>
            <p>Feels Like:{' '} {tempFeels}</p>
            <p>Wind: {' '}{wind}m/s</p>
            <p>Sunrise:{' '}{sunriseFormatted}</p>
            <p>Sunset: {' '}{sunsetFormatted}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
