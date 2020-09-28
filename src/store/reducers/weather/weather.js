import {
  WEATHER_DATA_REQUESTED
} from '../../actionsTypes';

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_DATA_REQUESTED:
      return state;
  
    default:
      return state;
  }
}