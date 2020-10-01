import produce from 'immer';
import {
  INITIAL_WEATHER_DATA_SUCCEEDED,
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
    data.forEach(entry => {
      draftState.favourieLocationData.push(entry);
    })
  })
  return nextState;
}

function setWeatherData(state, data, name) {
  const nextState = produce(state, draftState => {
    draftState.data = data;
    draftState.data.name = name; 
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
    case INITIAL_WEATHER_DATA_SUCCEEDED:
      return setFavouriteLocationsWeatherData(state, action.payload.data);

    case WEATHER_DATA_REQUESTED:
      return state;

    case WEATHER_DATA_SUCCEEDED:
      return setWeatherData(state, action.payload.data, action.payload.name);

    case WEATHER_DATA_FAILED:
      return weatherDataFailedHandler(state, action.payload.errorMsg)
  
    default:
      return state;
  }
}