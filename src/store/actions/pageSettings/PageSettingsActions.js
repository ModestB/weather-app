import {
  GET_FAVOURITE_LOCATIONS,
  ADD_FAVOURITE_LOCATION,
  DELETE_FAVOURITE_LOCATION,
} from '../../actionsTypes';


export const getFavouriteLocations = () => ({
  type: GET_FAVOURITE_LOCATIONS,
})

export const addFavouriteLocation = (location) => ({
  type: ADD_FAVOURITE_LOCATION,
  payload: {
    location
  }
})

export const deleteFavouriteLocation = (name) => ({
  type: DELETE_FAVOURITE_LOCATION,
  payload: {
    name
  }
})