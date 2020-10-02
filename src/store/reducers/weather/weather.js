import produce from 'immer';
import {
  FAVOURITE_WEATHER_DATA_SUCCEEDED,
  FAVOURITE_WEATHER_DATA_CLEAN,
  WEATHER_DATA_REQUESTED,
  WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_FAILED,
} from '../../actionsTypes';

const initialState = {
  favourieLocationData: [],
  data: [],
  error: false,
  errorMsg: ''
};

function setFavouriteLocationsWeatherData(state, data) {
  const nextState = produce(state, draftState => {
    draftState.favourieLocationData = data;
  })
  return nextState;
}

function cleanFavouriteLocationsWeatherData (state) {
  const nextState = produce(state, draftState => {
    draftState.favourieLocationData = [];
  })
  return nextState;
}

function setWeatherData(state, data, name, cityId) {
  const nextState = produce(state, draftState => {
    draftState.data = data;
    draftState.data.name = name; 
    draftState.data.cityId = cityId;
  })
  return nextState;
}

function weatherDataFailedHandler(state, errorMsg) {
  const nextState = produce(state, draftState => {
    draftState.error = true;
    draftState.errorMsg = errorMsg; 
  })
  return nextState;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_WEATHER_DATA_SUCCEEDED:
      return setFavouriteLocationsWeatherData(state, action.payload.data);

    case FAVOURITE_WEATHER_DATA_CLEAN: 
      return cleanFavouriteLocationsWeatherData(state);

    case WEATHER_DATA_REQUESTED:
      return state;

    case WEATHER_DATA_SUCCEEDED:
      return setWeatherData(state, action.payload.data, action.payload.name, action.payload.cityId);

    case WEATHER_DATA_FAILED:
      return weatherDataFailedHandler(state, action.payload.errorMsg)
  
    default:
      return state;
  }
}