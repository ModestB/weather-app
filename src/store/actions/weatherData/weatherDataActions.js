import {
  WEATHER_DATA_REQUESTED
} from '../../actionsTypes';

export const getWeatherData = (location) => {
  return {
    type: WEATHER_DATA_REQUESTED,
    payload: {
      location
    }
  }
}