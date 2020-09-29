import axios from 'axios';
import {
  INITIAL_WEATHER_DATA_REQUESTED,
  INITIAL_WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_REQUESTED
} from '../../actionsTypes';

export const getInitialWeatherDate = () => {
  return dispatch => {
    dispatch({type: INITIAL_WEATHER_DATA_REQUESTED})

    return axios.get(`http://api.openweathermap.org/data/2.5/group?id=593116,598316,598098&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&lang=lt`)
      .then(response => {
        console.log(response)
        dispatch({
          type: INITIAL_WEATHER_DATA_SUCCEEDED,
          payload: {
            data: response.data.list
          }
        })
      })
  }
}

export const getWeatherData = (location) => {
  return {
    type: WEATHER_DATA_REQUESTED,
    payload: {
      location
    }
  }
}