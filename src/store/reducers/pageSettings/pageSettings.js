import produce from 'immer';
import {
  WEATHER_DATA_SUCCEEDED,
  GET_FAVOURITE_LOCATIONS,
  ADD_FAVOURITE_LOCATION,
  DELETE_FAVOURITE_LOCATION,
} from '../../actionsTypes';
import { LOCAL_STORAGE_NAME } from '../../../utils/constants';

const initialState = {
  showSinglePage: false,
  favouriteLocations: {}
};

function weatherDataSucceededHandler(state) {
  const nextState = produce(state, draftState => {
    draftState.showSinglePage = true;
  })
  return nextState;
}

function getFavouriteLocationsHandler(state) {
  const favouriteLocations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

  const nextState = produce(state, draftState => {
    draftState.favouriteLocations = {...favouriteLocations};
  })
  return nextState;
}

function addFavouriteLocationHandler(state, location) {
  const nextState = produce(state, draftState => {
    draftState.favouriteLocations[Object.keys(location)[0]] = Object.values(location)[0];
  })

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(nextState.favouriteLocations));
  return nextState;
}

function deleteFavouriteLocationHandler (state, name) {
  const nextState = produce(state, draftState => {
    delete draftState.favouriteLocations[name]
  })

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(nextState.favouriteLocations));
  return nextState
}

export default (state = initialState, action) => {
  switch (action.type) {

    case WEATHER_DATA_SUCCEEDED:
      return weatherDataSucceededHandler(state);
  
    case GET_FAVOURITE_LOCATIONS: 
      return getFavouriteLocationsHandler(state);

    case ADD_FAVOURITE_LOCATION:
      return addFavouriteLocationHandler(state, action.payload.location);

    case DELETE_FAVOURITE_LOCATION:
      return deleteFavouriteLocationHandler(state, action.payload.name)

    default:
      return state;
  }
}