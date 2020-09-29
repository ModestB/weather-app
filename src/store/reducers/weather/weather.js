import produce from 'immer';
import {
  INITIAL_WEATHER_DATA_SUCCEEDED,
  WEATHER_DATA_REQUESTED
} from '../../actionsTypes';

const initialState = {
  data: [],
};

function setWeatherData(state, data) {
  const nextState = produce(state, draftState => {
    data.forEach(entry => {
      draftState.data.push(entry);
    })
  })
  return nextState;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_WEATHER_DATA_SUCCEEDED:
      return setWeatherData(state, action.payload.data);

    case WEATHER_DATA_REQUESTED:
      return state;
  
    default:
      return state;
  }
}