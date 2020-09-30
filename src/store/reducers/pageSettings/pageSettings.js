import produce from 'immer';
import {
  WEATHER_DATA_SUCCEEDED,
} from '../../actionsTypes';

const initialState = {
  showSinglePage: false
};


export default (state = initialState, action) => {
  switch (action.type) {

    case WEATHER_DATA_SUCCEEDED:
      return {showSinglePage: true};
  
    default:
      return state;
  }
}