import axios from 'axios';
import {
  INITIAL_WEATHER_DATA_REQUESTED,
  INITIAL_WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_REQUESTED,
  WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_FAILED,
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

export const getWeatherDataWithGeocode = (location) => {
  let name = '';
  return dispatch => {
    dispatch({ type: WEATHER_DATA_REQUESTED});

    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_GEOCODE_KEY}&autocomplete=true`)
      .then(response => {
        let lon, lat = null;

        if (response.data.features.length) {
          lon = response.data.features[0].center[0];
          lat = response.data.features[0].center[1];
          name = response.data.features[0].text;

          return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
        }
        return false;
         
      })
      .then(response => {
        if (!response) {
          dispatch({
            type: WEATHER_DATA_FAILED,
            payload: {
              errorMsg: 'Location not found',
            }
          })
        } else {
          dispatch({
            type: WEATHER_DATA_SUCCEEDED,
            payload: {
              data: response.data,
              name: name,
            }
          })
        }
      })
  }
}