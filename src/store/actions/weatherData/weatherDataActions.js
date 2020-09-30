import axios from 'axios';
import {
  INITIAL_WEATHER_DATA_REQUESTED,
  INITIAL_WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_REQUESTED,
  WEATHER_DATA_SUCCEEDED,
} from '../../actionsTypes';

export const getInitialWeatherDate = () => {
  return dispatch => {
    dispatch({type: INITIAL_WEATHER_DATA_REQUESTED})

    return axios.get(`http://api.openweathermap.org/data/2.5/group?id=593116,598316,598098&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&lang=lt`)
      .then(response => {
        dispatch({
          type: INITIAL_WEATHER_DATA_SUCCEEDED,
          payload: {
            data: response.data.list
          }
        })
      })
  }
}

export const getWeatherData = (lat, lon, name) => {
  return dispatch => {
    dispatch({ type: WEATHER_DATA_REQUESTED});

    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
      .then(response => {
        dispatch({
          type: WEATHER_DATA_SUCCEEDED,
          payload: {
            data: response.data,
            name: name,
          }
        })
      })
  }
}